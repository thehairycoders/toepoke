import { IAuthCredentials, LoginStatus } from '../../../models';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { AuthState } from '../../../store/reducers/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends StoreDrivenComponent implements OnInit {

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

  register(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.registerUser(authCredentials));
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.authState).subscribe(state => this.handleAuthState(state)));
  }

  private handleAuthState(state: AuthState) {
    this.toggleLoader(state.status);
    this.redirectIfLoggedIn(state);
  }

  private redirectIfLoggedIn(state: AuthState): void {
    if (state.status === LoginStatus.loggedIn) {
      this.router.navigate(['welcome']);
    }
  }

  private toggleLoader(loginStatus: LoginStatus): void {
    this.loading = loginStatus === LoginStatus.registering;
  }

}
