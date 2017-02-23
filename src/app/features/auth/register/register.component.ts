import { IAuthCredentials, LoginStatus, ActionStatus } from '../../../models';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading = false;
  authStoreSubscription: Subscription;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authStoreSubscription = this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state));
  }

  ngOnDestroy() {
    this.authStoreSubscription.unsubscribe();
  }

  register(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.registerUser(authCredentials));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.registerStatus);
    this.redirectIfLoggedIn(state.loginStatus);
  }

  private redirectIfLoggedIn(loginStatus: LoginStatus): void {
    if (loginStatus === LoginStatus.loggedIn) {
      this.router.navigate(['welcome']);
    }
  }

  private toggleLoader(registerStatus: ActionStatus): void {
    this.loading = registerStatus === ActionStatus.inProgress;
  }

}
