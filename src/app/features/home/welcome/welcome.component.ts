import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { Observable, Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

import { UserActions } from '../../../store/actions';
import * as RootStore from '../../../store';
import { IUser, UserStatus } from '../../../models';
import { UserState } from '../../../store/reducers/user';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent extends StoreDrivenComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private store: Store<RootStore.AppState>,
    private userActions: UserActions,
    private router: Router) {
    super(router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeToStore();
  }

  initialiseUser(user: IUser): void {
    this.store.dispatch(this.userActions.initialiseUser(user));
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.userState).subscribe(state => this.handleUserState(state)));
  }

  private handleUserState(state: UserState) {
    this.showLoader(state.status);
    this.redirectOnSuccess(state.status);
  }

  private showLoader(userStatus: UserStatus): void {

    switch (userStatus) {

      case UserStatus.updateInProgress:
        this.loading = true;
        break;

      default:
        this.loading = false;
    }

  }

  private redirectOnSuccess(userStatus: UserStatus): void {
    if (userStatus === UserStatus.updateSuccess) {
      this.router.navigate(['../users']);
    }
  }

}

