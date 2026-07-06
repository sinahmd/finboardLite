import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarketRateService } from './market-rate.service';
import { environment } from '../../../environments/environment';

describe('MarketRateService', () => {
  let service: MarketRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarketRateService]
    });
    service = TestBed.inject(MarketRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.match(() => true);
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch rate successfully', async () => {
    service.refresh();

    // Wait for the resource to schedule and make the HTTP request
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.flush([{
      success: true,
      price: 585000,
      high: 590000,
      low: 580000,
      time: '2024-01-15T10:30:00Z'
    }]);

    // Wait for the resource to process the response
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.rate()).toBeTruthy();
    expect(service.rate()?.price).toBe(585000);
    expect(service.rate()?.priceInToman).toBe(58500);
  });

  it('should handle empty array response', async () => {
    service.refresh();
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.flush([]);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()?.message).toBe('No data returned');
  });

  it('should handle 404 error', async () => {
    service.refresh();
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()?.message).toBe('Currency pair not supported');
  });

  it('should handle network error', async () => {
    service.refresh();
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.error(new ErrorEvent('Network error'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()?.message).toBe('Connection failed');
  });
});
