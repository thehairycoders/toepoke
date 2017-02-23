import { ActionStatus } from '../../../models/action-status';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  loading = false;
  authStoreSubscription: Subscription;

  constructor(
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private router: Router) {
  }

  ngOnInit() {
    this.authStoreSubscription = this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state));
  }

  ngOnDestroy() {
    this.authStoreSubscription.unsubscribe();
  }

  resetPassword(emailAddress: string): void {
    this.store.dispatch(this.authActions.resetPassword(emailAddress));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.passwordResetStatus);
    this.redirecOnSuccess(state.passwordResetStatus);
  }

  private redirecOnSuccess(passwordResetStatus: ActionStatus): void {
    if (passwordResetStatus === ActionStatus.success) {
      this.router.navigate(['login']);
    }
  }

  private toggleLoader(status: ActionStatus): void {
    this.loading = status === ActionStatus.inProgress;
  }

}
