import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should have isDark method returning boolean', () => {
    expect(typeof service.isDark()).toBe('boolean');
  });

  it('should toggle theme', () => {
    const before = service.isDark();
    service.toggle();
    expect(service.isDark()).toBe(!before);
  });

  it('should have mode signal', () => {
    expect(service.mode()).toBeDefined();
  });
});
