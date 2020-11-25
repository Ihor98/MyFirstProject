import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { MainLayoutComponentComponent } from './main-layout-component/main-layout-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { SidebarComponentComponent } from './main-layout-component/sidebar-component/sidebar-component.component';
import { MainContentComponentComponent } from './main-layout-component/main-content-component/main-content-component.component';
import { UserInfoComponent } from './main-layout-component/main-content-component/user-info/user-info.component';
import { CreateUserComponent } from './main-layout-component/main-content-component/create-user/create-user.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {UserState} from './user/store/user.state';
import { LoginComponent } from './main-layout-component/main-content-component/login/login.component';
import { AnswerPageComponent } from './main-layout-component/main-content-component/answer-page/answer-page.component';
import {AuthState} from './main-layout-component/main-content-component/login/auth/auth.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    MainLayoutComponentComponent,
    FooterComponentComponent,
    SidebarComponentComponent,
    MainContentComponentComponent,
    UserInfoComponent,
    CreateUserComponent,
    FilterPipe,
    LoginComponent,
    AnswerPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    NgxsModule.forRoot(
      [UserState, AuthState]
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
