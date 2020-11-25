import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../user.model';
import { AddUser, DeleteUser, GetUsers, UpdateUser } from './user.actions';
import { UserService } from '../user.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Defaults } from '../defaults/defaults';

export class UserStateModel {
  usersList: User[];
  user: User;
}

@State<UserStateModel>({
  name: 'users',
  defaults: Defaults.userState,
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static getUsers({ usersList }: UserStateModel): User[] {
    return usersList;
  }

  @Action(GetUsers)
  getUsers({ patchState }: StateContext<UserStateModel>): Observable<User[]> {
    return this.userService.getUsers().pipe(
      tap((usersList) => {
        patchState({ usersList });
      })
    );
  }

  @Action(AddUser)
  saveForm(
    { patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ): Observable<User[]> {
    return this.userService.addUser(payload).pipe(
      tap((usersList) => {
        patchState({ usersList });
      })
    );
  }

  @Action(DeleteUser)
  deleteUser(
    { patchState }: StateContext<UserStateModel>,
    { id }: DeleteUser
  ): Observable<User[]> {
    return this.userService.deleteUser(id).pipe(
      tap((usersList) => {
        patchState({ usersList });
      })
    );
  }

  @Action(UpdateUser)
  updateUser(
    { patchState }: StateContext<UserStateModel>,
    { payload }: UpdateUser
  ): Observable<User[]> {
    const { data, id } = payload;
    return this.userService.updateUserData(data, id).pipe(
      tap((usersList) => {
        patchState({ usersList });
      })
    );
  }
}
