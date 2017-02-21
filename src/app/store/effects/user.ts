import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService, UserService } from '../../services';
import { UserActions } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

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

    @Effect() getUser$ = this.actions$
        .ofType(UserActions.GET_USER_RECEIVED)
        .switchMap(() =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return this.userService.getUser(authState.uid)
                            .switchMap((user) => Observable.of(this.userActions.getUserSuccess(user)))
                            .catch(error => Observable.of(this.userActions.getUserFailure(error.message)));
                    } else {
                        return Observable.of({ type: UserActions.GET_USER_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: UserActions.GET_USER_FAILURE, payload: 'You must be logged in' }))
        );

    @Effect() initialiseUser$ = this.actions$
        .ofType(UserActions.INITIALISE_USER_RECEIVED)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return Observable.fromPromise(<Promise<void>>this.userService.initialiseUser(authState.uid, payload.data))
                            .switchMap(() => Observable.of({ type: UserActions.INITIALISE_USER_SUCCESS }))
                            .catch(error => Observable.of({ type: UserActions.INITIALISE_USER_FAILURE }));
                    } else {
                        return Observable.of({ type: UserActions.INITIALISE_USER_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: UserActions.INITIALISE_USER_FAILURE, payload: 'You must be logged in' }))
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
