import { LoginStatus, ActionStatus } from '../../models';
import { AuthActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

export interface AuthState {
    loginStatus: LoginStatus;
    registerStatus: ActionStatus;
    passwordResetStatus: ActionStatus;
    authState: FirebaseAuthState;    
}

const initialState: AuthState = {
    loginStatus: null,
    registerStatus: null,
    passwordResetStatus: null,
    authState: null    
};

export default function (state = initialState, action: Action): AuthState {

    switch (action.type) {

        case AuthActions.LOGIN_RECEIVED:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.loggingIn,
            });

        case AuthActions.LOGIN_FAILURE:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.loginFailed
            });

        case AuthActions.USER_AUTHENTICATED:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.loggedIn,
                authState: action.payload
            });

        case AuthActions.USER_NOT_AUTHENTICATED:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.loggedOut,
                authState: null
            });

        case AuthActions.LOGOUT_RECEIVED:
            return Object.assign({}, state, {
                loginStatus: LoginStatus.loggingOut,
            });

        case AuthActions.REGISTER_RECEIVED:
            return Object.assign({}, state, {
                registerStatus: ActionStatus.inProgress
            });

        case AuthActions.REGISTER_FAILURE:
            return Object.assign({}, state, {
                registerStatus: ActionStatus.failed
            });

        case AuthActions.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                registerStatus: ActionStatus.success
            });

        case AuthActions.PASSWORD_RESET_RECEIVED:
            return Object.assign({}, state, {
                passwordResetStatus: ActionStatus.inProgress
            });

        case AuthActions.PASSWORD_RESET_FAILURE:
            return Object.assign({}, state, {
                passwordResetStatus: ActionStatus.failed
            });

        case AuthActions.PASSWORD_RESET_SUCCESS:
            return Object.assign({}, state, {
                passwordResetStatus: ActionStatus.success
            });

        default:
            return Object.assign({}, state);
    }

}
