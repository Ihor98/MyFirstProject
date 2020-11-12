import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainContentComponentComponent} from './main-layout-component/main-content-component/main-content-component.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UserInfoComponent} from './user-info/user-info.component';

const routes: Routes = [
  {path: '', component: MainContentComponentComponent },
  {path: 'create', component: CreateUserComponent},
  {path: 'info', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
