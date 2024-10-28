import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  departureAirport: string = '';
  arrivalAirport: string = '';
  filteredDepartureAirports: any[] = [];
  filteredArrivalAirports: any[] = [];
  departureCode: string = '';
  arrivalCode: string = '';
  footprint: any;
  passengers: number = 1;
  private departureSearchTerms = new Subject<string>();
  private arrivalSearchTerms = new Subject<string>();

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.departureSearchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.httpService.searchAirports(term))
      )
      .subscribe((airports: any[]) => {
        this.filteredDepartureAirports = airports
      });

    this.arrivalSearchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.httpService.searchAirports(term))
      )
      .subscribe((airports: any[]) => {
        this.filteredArrivalAirports = airports
      });
  }

  onSearchAirport(query: string, type: 'departure' | 'arrival') {
    if (query.length >= 2) {
      if (type === 'departure') {
        this.departureSearchTerms.next(query);
      } else if (type === 'arrival') {
        this.arrivalSearchTerms.next(query);
      }
    } else {
      if (type === 'departure') {
        this.filteredDepartureAirports = [];
      } else if (type === 'arrival') {
        this.filteredArrivalAirports = [];
      }
    }
  }

  clearInput(type: 'departure' | 'arrival') {
    if (type === 'departure') {
      this.departureAirport = '';
      this.departureCode = '';
      this.filteredDepartureAirports = [];
    } else if (type === 'arrival') {
      this.arrivalAirport = '';
      this.arrivalCode = '';
      this.filteredArrivalAirports = [];
    }
  }
  
  selectAirport(airport: any, type: 'departure' | 'arrival') {
    const airportDetails = `${airport.name} - ${airport.city}, ${airport.country}`;
    if (type === 'departure') {
      this.departureAirport = airportDetails;
      this.departureCode = airport.code;
      this.filteredDepartureAirports = [];
    } else if (type === 'arrival') {
      this.arrivalAirport = airportDetails;
      this.arrivalCode = airport.code;
      this.filteredArrivalAirports = [];
    }
  }

  calculateFootprint() {
    this.httpService.getFlightFootprint(this.departureCode,this.arrivalCode)
    .subscribe(data => {
      this.footprint = data['footprint']
    })
  }

  reset() {
    this.departureAirport = '';
    this.arrivalAirport = '';
    this.departureCode = '';
    this.arrivalCode = '';
    this.passengers = 1;
    this.footprint = null;
    this.filteredDepartureAirports = [];
    this.filteredArrivalAirports = [];
  }
}
