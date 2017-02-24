import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { AuthRouting } from './auth.routing';
import { AuthFormComponent, ResetPasswordFormComponent, LoadingIndicatorComponent } from './components';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    AuthFormComponent,
    ResetPasswordFormComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    AuthRouting
  ]
})
export class AuthModule { }
