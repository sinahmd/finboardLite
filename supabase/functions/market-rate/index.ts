// supabase/functions/market-rate/index.ts
// Proxies currency API with caching and timeout

const EXTERNAL_API = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
const CACHE_TTL_MS = 60_000;
const FETCH_TIMEOUT_MS = 5_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

let cache: { data: unknown; timestamp: number } | null = null;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Serve from cache if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(EXTERNAL_API, {
      headers: { "Accept": "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`External API returned ${response.status}`);
      throw new Error("Upstream API error");
    }

    const raw = await response.json();
    const irrRate = raw?.usd?.irr;
    if (!irrRate) throw new Error("IRR rate missing from response");

    const result = {
      success: true,
      price: irrRate,
      time: raw.date ?? new Date().toISOString(),
    };

    cache = { data: result, timestamp: Date.now() };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("market-rate error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch rate" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
