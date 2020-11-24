import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryServiceService } from '../../../services/country-service.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../user/user.service';
import {Store} from '@ngxs/store';
import {AddUser} from '../../../user/store/user.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formInfo: FormGroup;
  newGroup: FormGroup;
  toggle = 1;
  countries = [];
  constructor(
    private fb: FormBuilder,
    private countryServiceService: CountryServiceService,
    private http: HttpClient,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.countryServiceService.getCountry().subscribe((response) => {
      this.countries = response;
    });
  }

  buildForm(): void {
    this.formInfo = this.fb.group(
      {
        firstname: [
          null,
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
          ],
        ],
        lastname: [
          null,
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
          ],
        ],
        username: [null, [Validators.required]],
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(/[0-9]/),
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
        mail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        check: [null, [Validators.required, Validators.minLength(6)]],
        formAdress: this.fb.array([
          this.fb.group({
            adressType: [null, Validators.required],
            adress: [null, Validators.required],
            city: [null, Validators.required],
            country: [null, Validators.required],
            postalCode: [
              null,
              [
                Validators.required,
                Validators.pattern(/[0-9]/),
                Validators.minLength(5),
                Validators.maxLength(5),
              ],
            ],
          }),
        ]),
      },
      { validator: this.checkIfMatchingPasswords('password', 'check') }
    );
  }
  // Check password validation
  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ): object {
    return (group: FormGroup) => {
      const passwordInput = group.get(passwordKey);
      const passwordConfirmationInput = group.get(passwordConfirmationKey);
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  addAdress(): void {
    const newAdress = this.fb.group({
      adressType: [null, Validators.required],
      adress: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
    });
    (this.formInfo.get('formAdress') as FormArray).push(newAdress);
  }
  // Getting the value from 'Main Info' inputs
  getInfoValue(form: FormGroup, formControlName: string): string {
    return form.get(formControlName).value;
  }

  // Delete the adress form instance
  deleteAdress(i: number): void {
    (this.formInfo.get('formAdress') as FormArray).removeAt(i);
  }

  addUser(): void {
    this.store.dispatch(new AddUser(this.formInfo.value));
  }
}
