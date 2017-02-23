import { LoginStatus } from '../../models';
import { AuthActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

export interface AuthState {
    status: LoginStatus;
    authState: FirebaseAuthState;
    newlyRegistered: boolean;
}

const initialState: AuthState = {
    status: LoginStatus.idle,
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

        case AuthActions.REGISTER_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.registering
            });

        case AuthActions.REGISTER_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.registerFailed
            });

        case AuthActions.PASSWORD_RESET_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetInProgress
            });

        case AuthActions.PASSWORD_RESET_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetFailed
            });

        case AuthActions.PASSWORD_RESET_SUCCESS:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetSuccess
            });

        case AuthActions.SET_AUTH_STATUS_IDLE:
            return Object.assign({}, state, {
                status: LoginStatus.idle
            });

        default:
            return Object.assign({}, state);
    }

}
