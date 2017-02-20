import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from "@ngrx/store";
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { SharedStoreModule } from './store';
import { AppComponent } from './app.component';
import { AuthService, NotifyService, UserService, AuthGuard } from './services';
import { NotifyComponent, ToolbarComponent } from './components';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NotifyComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, environment.firebaseAuthConfig),
    MaterialModule.forRoot(),
    FlexLayoutModule,
    SharedStoreModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    StoreModule,
    AuthService,
    NotifyService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
