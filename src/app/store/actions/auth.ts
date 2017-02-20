import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';
import { IAuthCredentials } from '../../models';

@Injectable()
export class AuthActions {
 
  static LOGIN_RECEIVED = 'LOGIN_RECEIVED';
  loginUser(authCredentials: IAuthCredentials): Action {
    return {
      type: AuthActions.LOGIN_RECEIVED,
      payload: authCredentials
    };
  }

  static LOGIN_FAILURE = 'LOGIN_FAILURE';
  loginFailure(error: string): Action {
    return {
      type: AuthActions.LOGIN_FAILURE,
      payload: error
    };
  }

  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  loginSuccess(): Action {
    return {
      type: AuthActions.LOGIN_SUCCESS
    };
  }

  static REGISTER_RECEIVED = 'REGISTER_RECEIVED';
  registerUser(authCredentials: IAuthCredentials): Action {
    return {
      type: AuthActions.REGISTER_RECEIVED,
      payload: authCredentials
    };
  }

  static REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  registerSuccess(): Action {
    return {
      type: AuthActions.REGISTER_SUCCESS
    };
  }

  static REGISTER_FAILURE = 'REGISTER_FAILURE';
  registerFailure(error: string): Action {
    return {
      type: AuthActions.REGISTER_FAILURE,
      payload: error
    };
  }
  
  static LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';
  logOutUser(): Action {
    return {
      type: AuthActions.LOGOUT_RECEIVED
    };
  }

  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  logoutSuccess(): Action {
    return {
      type: AuthActions.LOGOUT_SUCCESS
    };
  }    

  static USER_AUTHENTICATED = 'USER_AUTHENTICATED';
  userAuthenticated(authState: FirebaseAuthState): Action {
    return {
      type: AuthActions.USER_AUTHENTICATED,
      payload: authState
    };
  }
  
  static USER_NOT_AUTHENTICATED = 'USER_NOT_AUTHENTICATED';
  userNotAuthenticated(): Action {
    return {
      type: AuthActions.USER_NOT_AUTHENTICATED
    };
  }

}