import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpService: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['searchAirports', 'getFlightFootprint']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [{ provide: HttpService, useValue: httpSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchAirports on input for departure airport and populate results', fakeAsync(() => {
    const mockAirports = [
      { name: 'John F. Kennedy International', code: 'JFK', city: 'New York', country: 'USA' }
    ];
    httpService.searchAirports.and.returnValue(of(mockAirports));

    component.onSearchAirport('New', 'departure');
    tick(300);  // simulate debounce time

    expect(httpService.searchAirports).toHaveBeenCalledWith('New');
    expect(component.filteredDepartureAirports).toEqual(mockAirports);
  }));

  it('should call searchAirports on input for arrival airport and populate results', fakeAsync(() => {
    const mockAirports = [
      { name: 'Los Angeles International', code: 'LAX', city: 'Los Angeles', country: 'USA' }
    ];
    httpService.searchAirports.and.returnValue(of(mockAirports));

    component.onSearchAirport('Los', 'arrival');
    tick(300);  // simulate debounce time

    expect(httpService.searchAirports).toHaveBeenCalledWith('Los');
    expect(component.filteredArrivalAirports).toEqual(mockAirports);
  }));

  it('should clear departure input when clear button is clicked', () => {
    component.departureAirport = 'JFK';
    component.departureCode = 'JFK';
    component.clearInput('departure');

    expect(component.departureAirport).toBe('');
    expect(component.departureCode).toBe('');
    expect(component.filteredDepartureAirports).toEqual([]);
  });

  it('should clear arrival input when clear button is clicked', () => {
    component.arrivalAirport = 'LAX';
    component.arrivalCode = 'LAX';
    component.clearInput('arrival');

    expect(component.arrivalAirport).toBe('');
    expect(component.arrivalCode).toBe('');
    expect(component.filteredArrivalAirports).toEqual([]);
  });

  it('should select a departure airport and set the correct code', () => {
    const airport = { name: 'John F. Kennedy International', code: 'JFK', city: 'New York', country: 'USA' };
    component.selectAirport(airport, 'departure');

    expect(component.departureAirport).toBe('John F. Kennedy International - New York, USA');
    expect(component.departureCode).toBe('JFK');
    expect(component.filteredDepartureAirports).toEqual([]);
  });

  it('should select an arrival airport and set the correct code', () => {
    const airport = { name: 'Los Angeles International', code: 'LAX', city: 'Los Angeles', country: 'USA' };
    component.selectAirport(airport, 'arrival');

    expect(component.arrivalAirport).toBe('Los Angeles International - Los Angeles, USA');
    expect(component.arrivalCode).toBe('LAX');
    expect(component.filteredArrivalAirports).toEqual([]);
  });

  it('should calculate footprint when calculateFootprint is called', () => {
    const footprintData = { footprint: 150 };
    httpService.getFlightFootprint.and.returnValue(of(footprintData));

    component.departureCode = 'JFK';
    component.arrivalCode = 'LAX';
    component.calculateFootprint();

    expect(httpService.getFlightFootprint).toHaveBeenCalledWith('JFK', 'LAX');
    expect(component.footprint).toBe(150);
  });

  it('should reset the form when reset is called', () => {
    component.departureAirport = 'JFK';
    component.arrivalAirport = 'LAX';
    component.departureCode = 'JFK';
    component.arrivalCode = 'LAX';
    component.passengers = 3;
    component.footprint = 200;

    component.reset();

    expect(component.departureAirport).toBe('');
    expect(component.arrivalAirport).toBe('');
    expect(component.departureCode).toBe('');
    expect(component.arrivalCode).toBe('');
    expect(component.passengers).toBe(1);
    expect(component.footprint).toBeNull();
  });
});
