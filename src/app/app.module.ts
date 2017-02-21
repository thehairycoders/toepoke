import 'hammerjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NotifyComponent, ToolbarComponent } from './components';
import { HomeModule } from './features/home/home.module';
import { AuthGuard, AuthService, NotifyService, UserService } from './services';
import { SharedStoreModule } from './store';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';

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
    HomeModule,
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
