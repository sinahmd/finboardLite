// supabase/functions/market-rate/index.ts
// Proxies currency API to avoid CORS issues

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      { headers: { "Accept": "application/json" } }
    );

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    const irrRate = data?.usd?.irr;

    if (!irrRate) {
      throw new Error("IRR rate not found in response");
    }

    return new Response(
      JSON.stringify({
        success: true,
        price: irrRate,
        high: irrRate * 1.01,
        low: irrRate * 0.99,
        time: data.date || new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
