import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from './user/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetUsers} from './user/store/user.actions';
import {Login} from './main-layout-component/main-content-component/login/auth/auth.actions';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<User[]> {
  constructor(private store: Store) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.store.dispatch(new GetUsers());
  }
}
