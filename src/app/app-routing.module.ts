import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './main-layout-component/main-content-component/create-user/create-user.component';
import { UserInfoComponent } from './main-layout-component/main-content-component/user-info/user-info.component';
import { LoginComponent } from './main-layout-component/main-content-component/login/login.component';
import { AnswerPageComponent } from './main-layout-component/main-content-component/answer-page/answer-page.component';
import { AuthGuard } from './auth,guard';
import { UserResolver } from './user.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent },
  {
    path: 'info',
    component: UserInfoComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolver],
  },
  { path: '', component: AnswerPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolver],
})
export class AppRoutingModule {}
