import { Injectable } from '@angular/core';
import { Action, State, Store } from '@ngxs/store';
import { User } from '../user.model';

export class UserStateModel {
  users: User[];
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: null,
  },
})
@Injectable()
export class UserState {
  constructor(private store: Store) {}
}
