import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthActions } from './store/actions';
import * as RootStore from './store';
import { LoginStatus } from './models';

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
      this.loggedIn = authState.status === LoginStatus.loggedIn;
    });

    // this.router.events.subscribe(val => {
    //   console.log(val);
    // });

  }

  logout() {
    this.store.dispatch(this.authActions.logOutUser());
    this.router.navigate(['login']);
  }

}
