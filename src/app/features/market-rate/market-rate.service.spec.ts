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
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.flush({
      success: true,
      price: 585000,
      time: '2026-07-06'
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.rate()).toBeTruthy();
    expect(service.rate()?.price).toBe(585000);
    expect(service.rate()?.priceInToman).toBe(58500);
  });

  it('should handle error response', async () => {
    service.refresh();
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.flush({ success: false, error: 'Not found' }, { status: 500, statusText: 'Server Error' });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()).toBeTruthy();
  });

  it('should handle network error', async () => {
    service.refresh();
    await new Promise(resolve => setTimeout(resolve, 0));

    const req = httpMock.expectOne(environment.marketRateApiUrl);
    req.error(new ErrorEvent('Network error'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()?.message).toBe('اتصال از بین رفت');
  });
});
