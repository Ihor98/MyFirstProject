import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(users: Array<User>, search: string): Array<User> {
    if (search === '') {
      return [];
    }
    return users.filter((user) => {
      return user.firstname.includes(search);
    });
  }
}
