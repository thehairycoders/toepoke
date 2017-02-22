import { ISquad } from '../../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SquadActions {

  static GET_PLAYER_SQUADS_RECEIVED = 'GET_PLAYER_SQUADS_RECEIVED';
  static GET_PLAYER_SQUADS_FAILURE = 'GET_PLAYER_SQUADS_FAILURE';
  static GET_PLAYER_SQUADS_SUCCESS = 'GET_PLAYER_SQUADS_SUCCESS';
  static GET_MANAGER_SQUADS_RECEIVED = 'GET_MANAGER_SQUADS_RECEIVED';
  static GET_MANAGER_SQUADS_FAILURE = 'GET_MANAGER_SQUADS_FAILURE';
  static GET_MANAGER_SQUADS_SUCCESS = 'GET_MANAGER_SQUADS_SUCCESS';
  static SET_PLAYER_SQUAD_STATUS_IDLE = 'SET_PLAYER_SQUAD_STATUS_IDLE';
  static SET_MANAGER_SQUAD_STATUS_IDLE = 'SET_MANAGER_SQUAD_STATUS_IDLE';

   getPlayerSquads(): Action {
    return {
      type: SquadActions.GET_PLAYER_SQUADS_RECEIVED
    };
  }

  getPlayerSquadsFailure(error: string): Action {
    return {
      type: SquadActions.GET_PLAYER_SQUADS_FAILURE,
      payload: error
    };
  }

  getPlayerSquadsSuccess(squads: FirebaseListObservable<ISquad>): Action {
    return {
      type: SquadActions.GET_PLAYER_SQUADS_SUCCESS,
      payload: squads
    };
  }

  getManagerSquads(): Action {
    return {
      type: SquadActions.GET_MANAGER_SQUADS_RECEIVED
    };
  }

  getManagerSquadsFailure(error: string): Action {
    return {
      type: SquadActions.GET_MANAGER_SQUADS_FAILURE,
      payload: error
    };
  }

  getManagerSquadsSuccess(squads: FirebaseListObservable<ISquad>): Action {
    return {
      type: SquadActions.GET_MANAGER_SQUADS_SUCCESS,
      payload: squads
    };
  }

 setPlayerSquadStatusIdle(): Action {
    return {
      type: SquadActions.SET_PLAYER_SQUAD_STATUS_IDLE
    };
  }

 setManagerSquadStatusIdle(): Action {
    return {
      type: SquadActions.SET_MANAGER_SQUAD_STATUS_IDLE
    };
  }

}
