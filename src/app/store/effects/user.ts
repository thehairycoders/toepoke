import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { UserActions } from '../actions';
import { IUser } from '../../models';
import { AuthService, UserService } from '../../services';

@Injectable()
export class UserEffects {

    @Effect() getUsers$ = this.actions$
        .ofType(UserActions.GET_USERS_RECEIVED)
        .switchMap(() =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return this.userService.getUsers()
                            .switchMap((users) => Observable.of(this.userActions.getUsersSuccess(users)))
                            .catch(error => Observable.of(this.userActions.getUsersFailure(error.message)));
                    } else {
                        return Observable.of({ type: UserActions.GET_USERS_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: UserActions.GET_USERS_FAILURE, payload: 'You must be logged in' }))
        );

    @Effect() initialiseUser$ = this.actions$
        .ofType(UserActions.INITIALISE_USER_RECEIVED)
        .map(toPayload)
        .switchMap(payload =>
            Observable.fromPromise(<Promise<void>>this.userService.initialiseUser(payload.data))
                .switchMap(() => Observable.of({ type: UserActions.INITIALISE_USER_SUCCESS }))
                .catch(error => Observable.of({ type: UserActions.INITIALISE_USER_FAILURE }))
        );

    @Effect() setUserStateToIdle$ = this.actions$
        .ofType(
        UserActions.INITIALISE_USER_SUCCESS,
        UserActions.INITIALISE_USER_FAILURE,
        UserActions.GET_USERS_FAILURE,
        UserActions.GET_USERS_SUCCESS)
        .switchMap(() => Observable.of({ type: UserActions.SET_STATUS_IDLE }));

    constructor(
        private actions$: Actions,
        private userActions: UserActions,
        private authService: AuthService,
        private userService: UserService
    ) { }

}
