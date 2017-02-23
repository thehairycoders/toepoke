import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../../services';
import { AuthActions } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {

    @Effect() login$ = this.actions$
        .ofType(AuthActions.LOGIN_RECEIVED)
        .map(toPayload)
        .switchMap((authCredentials) =>
            this.authService.login(authCredentials)
                .switchMap(() => Observable.of(this.authActions.loginSuccess()))
                .catch(error => Observable.of(this.authActions.loginFailure(error.message)))
        );

    @Effect() logOut$ = this.actions$
        .ofType(AuthActions.LOGOUT_RECEIVED)
        .map(() => this.authService.logout())
        .map(() => this.authActions.logoutSuccess());

    @Effect() registerUser$ = this.actions$
        .ofType(AuthActions.REGISTER_RECEIVED)
        .map(toPayload)
        .switchMap(authCredentials =>
            this.authService.register(authCredentials)
                .switchMap(() => Observable.of(this.authActions.registerSuccess()))
                .catch(error => Observable.of(this.authActions.registerFailure(error.message)))
        );

    @Effect() passwordReset$ = this.actions$
        .ofType(AuthActions.PASSWORD_RESET_RECEIVED)
        .map(toPayload)
        .switchMap(emailAddress =>
            this.authService.resetPassword(emailAddress)
                .switchMap(() => Observable.of(this.authActions.resetPasswordSuccess()))
                .catch(error => Observable.of(this.authActions.resetPasswordFailure(error.message)))
        );

    @Effect() setAuthStateToIdle$ = this.actions$
        .ofType(
        AuthActions.PASSWORD_RESET_SUCCESS,
        AuthActions.PASSWORD_RESET_FAILURE)
        .switchMap(() => Observable.of({ type: AuthActions.SET_AUTH_STATUS_IDLE }));

    constructor(
        private actions$: Actions,
        private authActions: AuthActions,
        private authService: AuthService
    ) { }

}
