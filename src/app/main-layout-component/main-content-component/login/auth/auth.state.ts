import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Defaults } from '../../../../user/defaults/defaults';
import { Login } from './auth.actions';
import { User } from '../../../../user/user.model';

export interface AuthStateModel {
  password: string | null;
  username: string | null;
  currentUser: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: Defaults.authState,
})

@Injectable()
export class AuthState {
  constructor() {}

  @Selector()
  static getCurrentUser(state: AuthStateModel): User {
    return state.currentUser;
  }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { user }: Login): any {
    console.log(user, 'user')
    return patchState({currentUser: user});
  }
}
