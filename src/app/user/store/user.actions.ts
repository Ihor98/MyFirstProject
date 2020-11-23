import {User} from '../user.model';

export class AddUser {
  static readonly type = '[User] Add User';
  static readonly description = 'Adding user to users list';
  constructor(public payload: User) {
  }
}

export class GetUsers {
  static readonly type = '[User] Get Users';
  static readonly description = 'Getting user from server';
}

export class DeleteUser {
  static readonly type = '[User] Delete User';
  static readonly description = 'Deleting user from users list';
  constructor(public id: number) {
  }
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  static readonly description = 'Updating user data';
  constructor(public payload: {data: User, id: number}) {
  }
}

