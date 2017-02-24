import { Observable } from 'rxjs/Observable';
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

  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<RootStore.State>,
    private authActions: AuthActions,
    private router: Router) { }

  ngOnInit() {

    this.loggedIn$ = this.store.select(RootStore.getLoggedIn);

    this.router.events.subscribe(val => {
      console.log(val);
    });

  }

  logout() {
    this.store.dispatch(this.authActions.logOutUser());
    this.router.navigate(['login']);
  }

}
