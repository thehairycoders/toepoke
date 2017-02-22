import { AddSquadComponent } from './add-squad/add-squad.component';
import { SquadsRouting } from './squads.routing';
import { SquadFormComponent } from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';

@NgModule({
  declarations: [
    AddSquadComponent,
    SquadFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    SquadsRouting
  ]
})
export class SquadsModule { }
