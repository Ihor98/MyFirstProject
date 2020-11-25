import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../user/user.model';
import { UserService } from '../../../user/user.service';
import { Select, Store } from '@ngxs/store';
import { DeleteUser, UpdateUser } from '../../../user/store/user.actions';
import { AuthState } from '../login/auth/auth.state';
import { Observable } from 'rxjs';
import { UserState } from '../../../user/store/user.state';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Select(AuthState.getCurrentUser) currentUser$: Observable<User>;
  currentUser: User;
  searchForm: FormGroup;
  users: Array<User>;
  toggle = false;
  updatedUsersForm: FormGroup;
  updatedUserInfoArray: FormArray;
  userInfoFormToggle = true;
  newAdressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildSearchForm();
    this.buildNewAdressForm();
    this.currentUser$.subscribe((u) => (this.currentUser = u));
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      firstname: [null],
      lastname: [null],
      username: [null],
      mail: [null],
      phone: [null],
    });
  }

  getUsers(): void {
    this.users = this.store.selectSnapshot(UserState.getUsers);
    this.filter(this.searchForm.value);
    this.updatedUsersForm = this.fb.group({
      updatedUserInfoArray: this.fb.array([]),
    });
    this.users.forEach((user, index) => {
      user.showUserInfo = true;
      user.adressToggle = false;
      user.showAddAdress = false;
      (this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).push(
        this.buildUpdatedUserInfoForm(user)
      );
      user.formAdress.forEach((adress) => {
        adress.showAdressInfo = false;
        ((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray)
          .at(index)
          .get('formAdress') as FormArray).push(
          this.buildAdressFormGroup(adress)
        );
      });
    });
  }

  buildUpdatedUserInfoForm(user): FormGroup {
    return this.fb.group({
      firstname: [
        user.firstname,
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')],
      ],
      lastname: [
        user.lastname,
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')],
      ],
      username: [user.username, [Validators.required]],
      phone: [
        user.phone,
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      password: [user.password],
      formAdress: this.fb.array([]),
    });
  }

  buildAdressFormGroup(adress): FormGroup {
    return this.fb.group({
      adressType: [adress.adressType, Validators.required],
      country: [adress.country, Validators.required],
      city: [adress.city, Validators.required],
      postalCode: [
        adress.postalCode,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      adress: [
        adress.adress,
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
    });
  }

  deleteUser(i: number): void {
    this.store.dispatch(new DeleteUser(i));
    this.getUsers();
  }

  deleteAdress(i: number, j: number, id: number): void {
    ((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).controls[
      i
    ].get('formAdress') as FormArray).removeAt(j);
    const data = (this.updatedUsersForm.get(
      'updatedUserInfoArray'
    ) as FormArray).controls[i].value;
    this.store.dispatch(new UpdateUser({ data, id }));
    this.getUsers();
    this.users[i].adressToggle = false;
  }

  filter(object): void {
    const values = Object.values(object);
    const properties = Object.keys(object);
    values.forEach((value: string, index) => {
      this.users = this.users.filter((user) => {
        if (!value) {
          return user;
        }
        return user[properties[index]]
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });
    this.toggle = true;
  }

  clear(): void {
    this.toggle = false;
    this.searchForm.reset();
  }

  updateUserData(user: User, id: number, data: User): void {
    this.store.dispatch(new UpdateUser({ data, id }));
    this.getUsers();
  }

  buildNewAdressForm(): void {
    this.newAdressForm = this.fb.group({
      adressType: [null, Validators.required],
      adress: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
    });
  }

  addAdress(i: number, id: number): void {
    ((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).controls[
      i
    ].get('formAdress') as FormArray).push(this.newAdressForm);
    const data = (this.updatedUsersForm.get(
      'updatedUserInfoArray'
    ) as FormArray).controls[i].value;
    this.store.dispatch(new UpdateUser({ data, id }));
    this.getUsers();
    this.newAdressForm.reset();
  }
}
