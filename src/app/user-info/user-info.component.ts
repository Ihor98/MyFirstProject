import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GetUserService } from '../../services/getUser';
import { User } from '../models/user.model';
import { DeleteUserService } from '../../services/delete-user.service';

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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private getUserService: GetUserService,
    private deleteUserService: DeleteUserService
  ) {}
  ngOnInit(): void {
    this.buildSearchForm();
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
        user.show = true;
        (this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).push(
          this.buildUpdatedUserInfoForm(user)
        );
        user.formAdress.forEach((adress ) =>
          ((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).at(
            index
          ).get('formAdress') as FormArray).push(this.buildAdressFormGroup(adress)), 'test)'
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
      formAdress: this.fb.array([]),
    });
  }

  buildAdressFormArray(user): FormArray {
    return this.fb.array([
      user.formAdress.forEach((adress) =>
        this.fb.group({
          updatedAdressType: [adress.adressType, Validators.required],
          updatedAdress: [adress.adress, Validators.required],
          updatedCity: [adress.city, Validators.required],
          updatedCountry: [adress.country, Validators.required],
          updatedPostalCode: [
            adress.postalCode,
            [
              Validators.required,
              Validators.pattern(/[0-9]/),
              Validators.minLength(5),
              Validators.maxLength(5),
            ],
          ],
        })
      ),
    ]);
  }
  buildUpdatedAdressFormArray(user): void {
    (this.updatedAdressForm.get('updatedAdressArray') as FormArray).push(
      this.fb.array([user.formAdress.forEach((adress) => {this.buildAdressFormGroup(adress)})])
    );
  }

  buildAdressFormGroup(adress): FormGroup {
    return this.fb.group({
      adressType: [adress.adressType, Validators.required],
      country: [adress.country, Validators.required],
      city: [adress.city, Validators.required],
      postalCode: [adress.postalCode, Validators.required],
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
    this.deleteUserService.deleteUser(i).subscribe((resp) => {});
    this.getUsers();
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
    // console.log((this.updatedUsersForm.get('updatedUserInfoArray') as FormArray).controls[user.id].value);
    this.http.put('http://localhost:3000/profiles/' + (user.id), data).subscribe(console.log);
    user.show = !user.show;
    this.getUsers();
  }
}
