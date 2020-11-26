import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUsers } from '../../../user/store/user.actions';
import { User } from '../../../user/user.model';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login } from './auth/auth.actions';
import { UserState, UserStateModel } from '../../../user/store/user.state';
import { Observable } from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Select(UserState.getUsers) users$: Observable<User[]>;
  loginForm: FormGroup;
  users: User[];
  currentUser: User;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private logServ: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.store.dispatch(new GetUsers());
  }
  login(): void {
    this.logServ.login();
    this.users = this.store.selectSnapshot(UserState.getUsers);
    this.currentUser = this.users.find(
      (user) =>
        this.loginForm.get('login').value === user.username &&
        this.loginForm.get('password').value === user.password
    );
    this.store.dispatch(new Login(this.currentUser));
    this.router.navigate(['/info']);
  }
}
