import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  getData(): Observable<any> {
    return this.http.get('http://localhost:3000/profiles');
  }
  passData(formValue: object): Observable<object> {
    return this.http.post('http://localhost:3000/profiles', formValue);
  }
  deleteUser(i: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/profiles/${i}`);
  }
}
