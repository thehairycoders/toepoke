import { LoginStatus, ActionStatus } from '../../models';
import { AuthActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

export interface State {
    status: LoginStatus;
    passwordResetStatus: ActionStatus;
    authState: FirebaseAuthState;
    newlyRegistered: boolean;
    loggingIn: boolean;
    registering: boolean;
    resettingPassword: boolean;
    loggedIn: boolean;
    passwordResetEmail: string;
}

const initialState: State = {
    status: LoginStatus.idle,
    passwordResetStatus: null,
    authState: null,
    newlyRegistered: false,
    loggingIn: false,
    registering: false,
    resettingPassword: false,
    loggedIn: false,
    passwordResetEmail: null
};

export function reducer(state = initialState, action: Action): State {

    switch (action.type) {

        case AuthActions.LOGIN_RECEIVED:
            return Object.assign({}, state, {
                loggingIn: true,
                loggedIn: false
            });

        case AuthActions.LOGIN_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.loginFailed,
                loggingIn: false,
                loggedIn: false
            });

        case AuthActions.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                loggedIn: true
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

        case AuthActions.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                loggedIn: false
            });

        case AuthActions.REGISTER_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.registering,
                registering: true
            });

        case AuthActions.REGISTER_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.registerFailed,
                registering: false
            });

        case AuthActions.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                status: LoginStatus.registerFailed,
                registering: false
            });

        case AuthActions.PASSWORD_RESET_RECEIVED:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetInProgress,
                resettingPassword: true,
                passwordResetStatus: ActionStatus.inProgress,                
                passwordResetEmail: action.payload
            });

        case AuthActions.PASSWORD_RESET_FAILURE:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetFailed,
                resettingPassword: false,
                passwordResetStatus: ActionStatus.failed
            });

        case AuthActions.PASSWORD_RESET_SUCCESS:
            return Object.assign({}, state, {
                status: LoginStatus.passwordResetSuccess,
                resettingPassword: false,
                passwordResetStatus: ActionStatus.success
            });

        case AuthActions.SET_AUTH_STATUS_IDLE:
            return Object.assign({}, state, {
                status: LoginStatus.idle
            });

        default:
            return Object.assign({}, state);
    }

}

export const getLoggingIn = (state: State) => state.loggingIn;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getRegistering = (state: State) => state.registering;
export const getResettingPassword = (state: State) => state.resettingPassword;
export const getPasswordResetEmail = (state: State) => state.passwordResetEmail;
export const getPasswordResetStatus = (state: State) => state.passwordResetStatus;
