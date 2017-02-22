import { ISquad } from '../../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class SquadActions {

  static CREATE_SQUAD_RECEIVED = 'CREATE_SQUAD_RECEIVED';
  static CREATE_SQUAD_FAILURE = 'CREATE_SQUAD_FAILURE';
  static CREATE_SQUAD_SUCCESS = 'CREATE_SQUAD_SUCCESS';

  static GET_PLAYER_SQUADS_RECEIVED = 'GET_PLAYER_SQUADS_RECEIVED';
  static GET_PLAYER_SQUADS_FAILURE = 'GET_PLAYER_SQUADS_FAILURE';
  static GET_PLAYER_SQUADS_SUCCESS = 'GET_PLAYER_SQUADS_SUCCESS';
  static GET_MANAGER_SQUADS_RECEIVED = 'GET_MANAGER_SQUADS_RECEIVED';
  static GET_MANAGER_SQUADS_FAILURE = 'GET_MANAGER_SQUADS_FAILURE';
  static GET_MANAGER_SQUADS_SUCCESS = 'GET_MANAGER_SQUADS_SUCCESS';
  static SET_PLAYER_SQUAD_STATUS_IDLE = 'SET_PLAYER_SQUAD_STATUS_IDLE';
  static SET_MANAGER_SQUAD_STATUS_IDLE = 'SET_MANAGER_SQUAD_STATUS_IDLE';

  createSquad(squad: ISquad): Action {
    return {
      type: SquadActions.CREATE_SQUAD_RECEIVED,
      payload: squad
    };
  }

  createSquadSuccess(): Action {
    return {
      type: SquadActions.CREATE_SQUAD_SUCCESS
    };
  }

  createSquadFailure(error: string): Action {
    return {
      type: SquadActions.CREATE_SQUAD_FAILURE,
      payload: error
    };
  }

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

  getPlayerSquadsSuccess(squads: Array<FirebaseObjectObservable<ISquad>>): Action {
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
