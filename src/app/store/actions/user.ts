import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { IUser } from '../../models';

@Injectable()
export class UserActions {
 
  static INITIALISE_USER_RECEIVED = 'INITIALISE_USER_RECEIVED';
  initialiseUser(user: IUser): Action {
    return {
      type: UserActions.INITIALISE_USER_RECEIVED,
      payload: {data: user }
    };
  }

  static INITIALISE_USER_FAILURE = 'INITIALISE_USER_FAILURE';
  initialiseUserFailure(error: string): Action {
    return {
      type: UserActions.INITIALISE_USER_FAILURE,
      payload: error
    };
  }

  static INITIALISE_USER_SUCCESS = 'INITIALISE_USER_SUCCESS';
  initialiseUserSuccess(): Action {
    return {
      type: UserActions.INITIALISE_USER_SUCCESS
    };
  } 
  
static GET_USERS_RECEIVED = 'GET_USERS_RECEIVED';
  getUsers(): Action {
    return {
      type: UserActions.GET_USERS_RECEIVED
    };
  }

  static GET_USERS_FAILURE = 'GET_USERS_FAILURE';
  getUsersFailure(error: string): Action {
    return {
      type: UserActions.GET_USERS_FAILURE,
      payload: error
    };
  }

  static GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  getUsersSuccess(users: FirebaseListObservable<IUser>): Action {
    return {
      type: UserActions.GET_USERS_SUCCESS,
      payload: users
    };
  } 

  static SET_STATUS_IDLE = 'SET_STATUS_IDLE';
  setUserStatusIdle(): Action {
    return {
      type: UserActions.SET_STATUS_IDLE
    };
  } 



}