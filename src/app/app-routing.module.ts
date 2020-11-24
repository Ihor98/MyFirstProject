import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainContentComponentComponent} from './main-layout-component/main-content-component/main-content-component.component';
import {CreateUserComponent} from './main-layout-component/main-content-component/create-user/create-user.component';
import {UserInfoComponent} from './main-layout-component/main-content-component/user-info/user-info.component';

const routes: Routes = [
  {path: 'login', component: MainContentComponentComponent },
  {path: 'create', component: CreateUserComponent},
  {path: 'info', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
