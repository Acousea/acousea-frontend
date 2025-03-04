import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NominatimLocationService } from './nominatim-location-service.service';
import { LocationResult } from '../location-interfaces';

describe('NominatimLocationService', () => {
  let service: NominatimLocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NominatimLocationService]
    });
    service = TestBed.inject(NominatimLocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a free-form query and return LocationResults', () => {
    const mockResponse = [
      {
        display_name: '10 Downing Street, London, United Kingdom',
        lat: '51.5033635',
        lon: '-0.1276248',
        address: {
          road: 'Downing Street',
          city: 'London',
          country: 'United Kingdom',
          postcode: 'SW1A 2AA'
        }
      }
    ];

    const expectedResults: LocationResult[] = [
      {
        displayName: '10 Downing Street, London, United Kingdom',
        latitude: 51.5033635,
        longitude: -0.1276248,
        addressDetails: {
          road: 'Downing Street',
          city: 'London',
          country: 'United Kingdom',
          postcode: 'SW1A 2AA'
        }
      }
    ];

    service.searchAddress('10 Downing Street, London').subscribe(results => {
      console.log("Results: ", results);
      console.log("Expected Results: ", expectedResults)
      expect(results).toEqual(expectedResults);
    });

    const req = httpMock.expectOne((req) => req.url === 'https://nominatim.openstreetmap.org/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('10 Downing Street, London');
    expect(req.request.params.get('format')).toBe('json');
    expect(req.request.params.get('addressdetails')).toBe('1');
    expect(req.request.params.get('limit')).toBe('5');

    req.flush(mockResponse);
  });

  it('should perform a structured query and return LocationResults', () => {
    const mockResponse = [
      {
        display_name: '10 Downing Street, London, United Kingdom',
        lat: '51.5033635',
        lon: '-0.1276248',
        address: {
          road: 'Downing Street',
          city: 'London',
          country: 'United Kingdom',
          postcode: 'SW1A 2AA'
        }
      }
    ];

    const structuredQuery = {
      street: 'Downing Street',
      city: 'London',
      country: 'United Kingdom'
    };

    const expectedResults: LocationResult[] = [
      {
        displayName: '10 Downing Street, London, United Kingdom',
        latitude: 51.5033635,
        longitude: -0.1276248,
        addressDetails: {
          road: 'Downing Street',
          city: 'London',
          country: 'United Kingdom',
          postcode: 'SW1A 2AA'
        }
      }
    ];

    service.searchAddress(structuredQuery, true).subscribe(results => {
      expect(results).toEqual(expectedResults);
    });

    const req = httpMock.expectOne((req) => req.url === 'https://nominatim.openstreetmap.org/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('street')).toBe('Downing Street');
    expect(req.request.params.get('city')).toBe('London');
    expect(req.request.params.get('country')).toBe('United Kingdom');
    expect(req.request.params.get('format')).toBe('json');
    expect(req.request.params.get('addressdetails')).toBe('1');
    expect(req.request.params.get('limit')).toBe('5');

    req.flush(mockResponse);
  });
});
