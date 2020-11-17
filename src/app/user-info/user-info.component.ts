import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GetUserService } from '../../services/getUser';
import { User } from '../models/user.model';
import { DeleteUserService } from '../../services/delete-user.service';
import {AddUserService} from '../../services/addUser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  searchForm: FormGroup;
  users: Array<User>;
  toggle = false;
  updatedUsersForm: FormGroup;
  updatedUserInfoArray: FormArray;
  updatedAdressForm: FormGroup;
  updatedUserInfoForm: FormGroup;
  userInfoFormToggle = true;
  newAdressForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private getUserService: GetUserService,
    private deleteUserService: DeleteUserService,
    private addUserService: AddUserService
  ) {
  }

  ngOnInit(): void {
    this.buildSearchForm();
    this.buildNewAdressForm();
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
    this.getUserService.getData().subscribe((resp) => {
      this.users = resp;
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

  deleteUsers(i: number): void {
    this.deleteUserService.deleteUser(i).subscribe();
    this.getUsers();
  }

  deleteAdress(i: number, j: number): void {
    ((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).controls[i].get('formAdress') as FormArray).removeAt(j);
    const data = (this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).controls[i].value;
    this.http
      .put('http://localhost:3000/profiles/' + this.users[i].id, data)
      .subscribe();
    this.getUsers();
    this.users[i].adressToggle = true;
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

  updateUserData(user: User, data: object): void {
    this.http
      .put('http://localhost:3000/profiles/' + user.id, data)
      .subscribe();
    user.showUserInfo = !user.showUserInfo;
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


  addAdress(i: number): void {
    this.users[i].formAdress.push(this.newAdressForm.value);
    this.http.put('http://localhost:3000/profiles/' + this.users[i].id, this.users[i]).subscribe();
    this.getUsers();
    this.newAdressForm.reset();
  }
}
