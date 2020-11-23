import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/profiles');
  }

  addUser(userData): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:3000/profiles', userData);
  }

  deleteUser(i: number): Observable<User[]> {
    return this.http.delete<User[]>(`http://localhost:3000/profiles/${i}`);
  }

  updateUserData(user: User, id: number): Observable<User[]> {
    return this.http.put<User[]>(
      `http://localhost:3000/profiles/${id}`, user
    );
  }
}
