import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Country} from '../app/models/country.model';



@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {
  constructor(private http: HttpClient) {}

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.eu/rest/v2/all');
  }
}
