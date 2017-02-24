import { getPasswordResetStatus } from '../../../store';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { State } from '../../../store/reducers/auth';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActionStatus } from './../../../models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnDestroy {

  loading$: Observable<boolean>;
  storeSubscription: Subscription;

  constructor(
    private store: Store<RootStore.State>,
    private authActions: AuthActions,
    private router: Router) {

    this.loading$ = store.select(RootStore.getResettingPassword);
    this.storeSubscription = store.select(RootStore.getPasswordResetStatus).subscribe(passwordResetStatus => this.handleAuthState(passwordResetStatus));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  resetPassword(emailAddress: string): void {
    this.store.dispatch(this.authActions.resetPassword(emailAddress));
  }

  private handleAuthState(passwordResetStatus: ActionStatus) {
    if (passwordResetStatus === ActionStatus.success) {
      this.router.navigate(['/reset-password-success']);
    }
  }

}
