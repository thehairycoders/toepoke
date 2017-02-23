import { IUser } from '../../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class UserActions {

  static INITIALISE_USER_RECEIVED = 'INITIALISE_USER_RECEIVED';
  static INITIALISE_USER_FAILURE = 'INITIALISE_USER_FAILURE';
  static INITIALISE_USER_SUCCESS = 'INITIALISE_USER_SUCCESS';
  static GET_USERS_RECEIVED = 'GET_USERS_RECEIVED';
  static GET_USERS_FAILURE = 'GET_USERS_FAILURE';
  static GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  static GET_USER_RECEIVED = 'GET_USER_RECEIVED';
  static GET_USER_FAILURE = 'GET_USER_FAILURE';
  static GET_USER_SUCCESS = 'GET_USER_SUCCESS';
  static SET_USER_STATUS_IDLE = 'SET_USER_STATUS_IDLE';

  initialiseUser(user: IUser): Action {
    return {
      type: UserActions.INITIALISE_USER_RECEIVED,
      payload: { data: user }
    };
  }

  initialiseUserFailure(error: string): Action {
    return {
      type: UserActions.INITIALISE_USER_FAILURE,
      payload: error
    };
  }

  initialiseUserSuccess(): Action {
    return {
      type: UserActions.INITIALISE_USER_SUCCESS
    };
  }

  getUsers(): Action {
    return {
      type: UserActions.GET_USERS_RECEIVED
    };
  }

  getUsersFailure(error: string): Action {
    return {
      type: UserActions.GET_USERS_FAILURE,
      payload: error
    };
  }

  getUsersSuccess(users: FirebaseListObservable<IUser>): Action {
    return {
      type: UserActions.GET_USERS_SUCCESS,
      payload: users
    };
  }

  getUser(): Action {
    return {
      type: UserActions.GET_USER_RECEIVED
    };
  }

  getUserFailure(error: string): Action {
    return {
      type: UserActions.GET_USER_FAILURE,
      payload: error
    };
  }

  getUserSuccess(user: FirebaseObjectObservable<IUser>): Action {
    return {
      type: UserActions.GET_USER_SUCCESS,
      payload: user
    };
  }

  setUserStatusIdle(): Action {
    return {
      type: UserActions.SET_USER_STATUS_IDLE
    };
  }

}
