import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeRoutingModule } from './home.routing';
import { WelcomeFormComponent } from './components';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersComponent } from './users/users.component';

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
    MaterialModule.forRoot(),
    FlexLayoutModule,
    HomeRoutingModule    
  ]
})
export class HomeModule { }
