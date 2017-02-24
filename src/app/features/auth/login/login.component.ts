import { environment } from '../../../../environments/environment';
import { IAuthCredentials } from '../../../models';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { State } from '../../../store/reducers/auth';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading$: Observable<boolean>;

  constructor(
    private store: Store<RootStore.State>,
    private authActions: AuthActions,
    private router: Router,
    private route: ActivatedRoute) {

    this.loading$ = store.select(RootStore.getLoggingIn); 
    store.select(RootStore.getLoggedIn).subscribe(loggedIn => this.handleAuthState(loggedIn));
    
  }

  login(authCredentials: IAuthCredentials): void {
    this.store.dispatch(this.authActions.loginUser(authCredentials));
  }

  private handleAuthState(loggedIn: boolean) {
    if (loggedIn) {
      this.route.queryParams.subscribe(params => this.router.navigate([params['redirect_url'] || environment.homeRoute]));    
    }
  }

}
