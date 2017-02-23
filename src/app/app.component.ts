import { LoginStatus } from './models';
import * as RootStore from './store';
import { AuthActions } from './store/actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedIn = false;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router) { }

  ngOnInit() {

    this.store.select(store => store.authState).subscribe(authState => {
      this.loggedIn = authState.loginStatus === LoginStatus.loggedIn;
    });

    this.router.events.subscribe(val => {
      console.log(val);
    });

  }

  logout() {
    this.store.dispatch(this.authActions.logOutUser());
    this.router.navigate(['login']);
  }

}
