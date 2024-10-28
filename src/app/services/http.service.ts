import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = '../../assets/airport.json'; // Path to JSON file
  private FOOTPRINT_API_URL = 'https://api.goclimate.com/v1/flight_footprint';
  private API_KEY = '5bb5236b4f81b040b58c66dd'; // Replace with your GoClimate API Key

  constructor(private http: HttpClient) {}

  getAirports(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  searchAirports(query: string): Observable<any[]> {
    return this.getAirports().pipe(
      map(airports => airports.filter(airport =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase()) ||
        airport.country.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  getFlightFootprint(origin: string, destination: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(this.API_KEY + ':')}`
    });

    // Define query parameters
    const params = new HttpParams()
      .set('segments[0][origin]', origin)
      .set('segments[0][destination]',destination)
      .set('cabin_class', 'economy')
      .append('currencies[]', 'USD');

    return this.http.get(this.FOOTPRINT_API_URL, { headers, params });
  }
}
