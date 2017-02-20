import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { AuthService } from '../../services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { AuthActions } from '../actions';
import { IAuthCredentials } from '../../models';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authActions: AuthActions,
        private authService: AuthService
    ) { }

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

}