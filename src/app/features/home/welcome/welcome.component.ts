import { IUser, UserStatus } from '../../../models';
import * as RootStore from '../../../store';
import { UserActions } from '../../../store/actions';
import { UserState } from '../../../store/reducers/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loading = false;
  userStoreSubscription: Subscription;

  constructor(
    private store: Store<RootStore.AppState>,
    private userActions: UserActions,
    private router: Router) {
  }

  ngOnInit() {
    this.userStoreSubscription = this.store.select(store => store.userState).subscribe(state => this.handleUserState(state));
  }

  ngOnDestroy() {
    this.userStoreSubscription.unsubscribe();
  }

  initialiseUser(user: IUser): void {
    this.store.dispatch(this.userActions.initialiseUser(user));
  }

  private handleUserState(state: UserState) {
    this.showLoader(state.status);
    this.redirectOnSuccess(state.status);
  }

  private showLoader(userStatus: UserStatus): void {    
    this.loading = userStatus === UserStatus.updateInProgress;
  }

  private redirectOnSuccess(userStatus: UserStatus): void {
    if (userStatus === UserStatus.updateSuccess) {
      this.router.navigate(['../dashboard']);
    }
  }

}

