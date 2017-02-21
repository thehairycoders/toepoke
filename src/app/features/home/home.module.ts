import { WelcomeFormComponent } from './components';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';

@NgModule({
  declarations: [
    WelcomeFormComponent,
    WelcomeComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GooglePlaceModule,
    MaterialModule.forRoot(),
    FlexLayoutModule
  ]
})
export class HomeModule { }
