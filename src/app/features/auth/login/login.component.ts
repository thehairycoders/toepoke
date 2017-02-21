import { IAuthCredentials, LoginStatus } from '../../../models';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends StoreDrivenComponent implements OnInit {

  loading = false;
  targetIfAuthorised: string;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router,
    private route: ActivatedRoute) {
    super(router);
  }

  ngOnInit() {
    this.setTargetRouteIfAuthorised();

    super.ngOnInit();
    this.subscribeToStore();
  }

  login(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.loginUser(authCredentials));
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state)));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.status);
    if (this.isUserLoggedIn(state)) {
      this.redirectToAuthorisedTarget();
    }
  }

  private setTargetRouteIfAuthorised() {
    this.route.queryParams.subscribe(params => this.targetIfAuthorised = params['redirect_url'] || environment.homeRoute);
  }

  private isUserLoggedIn(state: AuthState): boolean {
    return state.status === LoginStatus.loggedIn;
  }

  private redirectToAuthorisedTarget(): void {
    this.router.navigate([this.targetIfAuthorised]);
  }

  private toggleLoader(loginStatus: LoginStatus): void {
    this.loading = loginStatus === LoginStatus.loggingIn || loginStatus === LoginStatus.loggingOut;
  }

}
