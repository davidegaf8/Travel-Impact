import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter airports based on query', () => {
    const mockAirports = [
      { name: 'John F Kennedy', code: 'JFK', city: 'New York', country: 'USA' },
      { name: 'Los Angeles International', code: 'LAX', city: 'Los Angeles', country: 'USA' }
    ];
    const query = 'New';

    service.searchAirports(query).subscribe((result) => {
      expect(result).toEqual([
        { name: 'John F Kennedy', code: 'JFK', city: 'New York', country: 'USA' }
      ]);
    });

    const req = httpMock.expectOne('../../assets/airport.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAirports);
  });

  it('should retrieve flight footprint from API', () => {
    const origin = 'JFK';
    const destination = 'LAX';
    const mockFootprintData = { footprint: 200 };

    service.getFlightFootprint(origin, destination).subscribe((data) => {
      expect(data).toEqual(mockFootprintData);
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'https://api.goclimate.com/v1/flight_footprint' &&
      request.params.get('segments[0][origin]') === origin &&
      request.params.get('segments[0][destination]') === destination &&
      request.params.get('cabin_class') === 'economy'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Basic ${btoa('5bb5236b4f81b040b58c66dd:')}`);
    req.flush(mockFootprintData);
  });
});
