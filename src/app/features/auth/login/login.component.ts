import { environment } from '../../../../environments/environment';
import { IAuthCredentials, LoginStatus } from '../../../models';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  authStoreSubscription: Subscription;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.authStoreSubscription = this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state)); 
  }

  ngOnDestroy() {
    this.authStoreSubscription.unsubscribe();
  }

  login(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.loginUser(authCredentials));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.loginStatus);

    if (this.isUserLoggedIn(state)) {
      this.redirectToAuthorisedTarget();
    }
  }

  private isUserLoggedIn(state: AuthState): boolean {
    return state.loginStatus === LoginStatus.loggedIn;
  }

  private redirectToAuthorisedTarget(): void {
   
    this.route.queryParams.subscribe(params => {
      this.router.navigate([params['redirect_url'] || environment.homeRoute]);
    });

  }

  private toggleLoader(loginStatus: LoginStatus): void {
    this.loading = loginStatus === LoginStatus.loggingIn || loginStatus === LoginStatus.loggingOut;
  }

}
