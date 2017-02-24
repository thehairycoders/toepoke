import { IAuthCredentials } from '../../../models';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { State } from '../../../store/reducers/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loading$: Observable<boolean>;

  constructor(
    private store: Store<RootStore.State>,
    private authActions: AuthActions,
    private router: Router) {

    this.loading$ = store.select(RootStore.getRegistering);
    store.select(RootStore.getLoggedIn).subscribe(loggedIn => this.handleAuthState(loggedIn));

  }

  register(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.registerUser(authCredentials));
  }

  private handleAuthState(loggedIn: boolean) {
    if (loggedIn) {
      this.router.navigate(['welcome']);
    }
  }
}
