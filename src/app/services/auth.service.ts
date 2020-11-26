import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 isLogin = false;
 login(): void{
   this.isLogin = true;
 }
 logout(): void {
   this.isLogin = false;
 }
}
