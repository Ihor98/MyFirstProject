import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  constructor(private http: HttpClient) {}
  passData(formValue: object): Observable<object> {
    return this.http.post('http://localhost:3000/profiles', formValue);
  }
}
