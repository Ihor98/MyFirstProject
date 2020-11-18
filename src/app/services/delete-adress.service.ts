import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteAdressService {

  constructor(private http: HttpClient) { }
  deleteAdress(i: number, user: User): Observable<any> {
    return this.http.delete(`http://localhost:3000/profiles/${user.id}`);
  }
}
