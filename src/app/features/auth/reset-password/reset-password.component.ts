import { IAuthCredentials, LoginStatus } from '../../../models';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends StoreDrivenComponent implements OnInit {

  loading = false;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router,
    private route: ActivatedRoute) {
    super(router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeToStore();
  }

  resetPassword(emailAddress: string): void {
    this.store.dispatch(this.authActions.resetPassword(emailAddress));
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state)));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.status);
    this.redirectIfLoggedIn(state);
  }

  private redirectIfLoggedIn(state: AuthState): void {
    if (state.status === LoginStatus.passwordResetSuccess) {
      this.router.navigate(['login']);
    }
  }

  private toggleLoader(loginStatus: LoginStatus): void {
    this.loading = loginStatus === LoginStatus.passwordResetInProgress;
  }

}
