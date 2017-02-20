import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

import { IAuthCredentials, LoginStatus } from '../../models';
import { AuthActions } from './../actions';

export interface AuthState {
    status: LoginStatus,
    authState: FirebaseAuthState,
    newlyRegistered: boolean
}

const initialState: AuthState = {
    status: LoginStatus.unknown,
    authState: null,
    newlyRegistered: false
};

export default function (state = initialState, action: Action): AuthState {

    switch (action.type) {

        case AuthActions.LOGIN_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.loggingIn,
            });

        case AuthActions.LOGIN_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.loginFailed
            });

        // case AuthActions.LOGIN_SUCCESS:
        //     return Object.assign({}, state, {
        //         status: LoginStatus.loggedIn
        //     });

        case AuthActions.USER_AUTHENTICATED:
            return Object.assign({}, state, {
                status: LoginStatus.loggedIn,
                authState: action.payload
            });

        case AuthActions.USER_NOT_AUTHENTICATED:
            return Object.assign({}, state, {
                status: LoginStatus.loggedOut,
                authState: null
            });

        case AuthActions.LOGOUT_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.loggingOut,
            });

        // case AuthActions.LOGOUT_SUCCESS:
        //     return Object.assign({}, state, {
        //         status: LoginStatus.loggedOut,
        //     });

        case AuthActions.REGISTER_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.registering
            });

        case AuthActions.REGISTER_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.registerFailed
            });

        // case AuthActions.REGISTER_SUCCESS:
        //     return Object.assign({}, state, {
        //         status: LoginStatus.loggedIn
        //     });

        default:
            return Object.assign({}, state);
    }

}