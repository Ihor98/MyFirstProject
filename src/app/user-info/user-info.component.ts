import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  updatedAdressArray: FormArray;
  updatedAdressForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private getUserService: GetUserService,
    private deleteUserService: DeleteUserService,
    private cdr: ChangeDetectorRef
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
  buildUpdatedAdressForm(user): void {
    // this.updatedAdressForm = this.fb.group({
    //   updatedAdressArray: this.fb.array(this.test(users)),
    // });
    // console.log(this.updatedAdressForm, 'adress');
    let arr = [];
    arr = [...arr, this.test(user.formAdress)];
    console.log(arr, 'arr');
    this.cdr.detectChanges();
  }

  test(data): FormGroup {
    return data.forEach((adress) => {
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
      });
    });
    this.cdr.detectChanges();
  }

  getUsers(): void {
    this.getUserService.getData().subscribe((resp) => {
      this.users = resp;
      this.filter(this.searchForm.value);
    });
  }
  deleteUsers(i: number): void {
    this.deleteUserService.deleteUser(i).subscribe((resp) => {
      console.log(resp);
    });
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
}
