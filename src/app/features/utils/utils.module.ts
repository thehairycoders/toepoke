import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UtilsRouting } from './utils.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    UtilsRouting
  ]
})
export class UtilsModule { }
