import { LoginStatus } from '../models';
import * as fromRoot from '../store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<fromRoot.AppState>,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.store.select(store => store.authState)
      .map(authState => {

        if (this.authenticated(authState.status)) {
          return true;
        } else {
          this.redirectToLogin(state.url);
          return false;
        }

      })
      .catch(error => {
        this.redirectToLogin(state.url);
        return Observable.of(false);
      });

  }

  redirectToLogin(redirectUrl: string) {
    this.router.navigate(['login'], { queryParams: { 'redirect_url': redirectUrl } });
  }

  authenticated(loginStatus: LoginStatus) {
    return loginStatus === LoginStatus.loggedIn;

  }

}
