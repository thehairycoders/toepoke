import { ISquad, SquadStatus } from '../../models';
import { SquadActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


export interface SquadState {
    playerSquads: Array<FirebaseObjectObservable<ISquad>>;
    managerSquads: FirebaseListObservable<ISquad>;
    playerSquadStatus: SquadStatus;
    managerSquadStatus: SquadStatus;
}

const initialState: SquadState = {
    playerSquads: null,    
    playerSquadStatus: SquadStatus.idle,
    managerSquads: null,    
    managerSquadStatus: SquadStatus.idle
};

export default function (state = initialState, action: Action): SquadState {

    switch (action.type) {

        case SquadActions.CREATE_SQUAD_RECEIVED:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.updateInProgress
            });

        case SquadActions.CREATE_SQUAD_FAILURE:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.updateFailure
            });

        case SquadActions.CREATE_SQUAD_SUCCESS:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.updateSuccess
            });

        case SquadActions.GET_PLAYER_SQUADS_RECEIVED:
            return Object.assign({}, state, {
                playerSquadStatus: SquadStatus.getInProgress
            });

        case SquadActions.GET_PLAYER_SQUADS_SUCCESS:
            return Object.assign({}, state, {
                playerSquadStatus: SquadStatus.getSuccess,
                playerSquads: action.payload
            });

        case SquadActions.GET_PLAYER_SQUADS_FAILURE:
            return Object.assign({}, state, {
                playerSquadStatus: SquadStatus.getFailure
            });

        case SquadActions.SET_PLAYER_SQUAD_STATUS_IDLE:
            return Object.assign({}, state, {
                playerSquadStatus: SquadStatus.idle
            });

        case SquadActions.GET_MANAGER_SQUADS_RECEIVED:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.getInProgress
            });

        case SquadActions.GET_MANAGER_SQUADS_SUCCESS:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.getSuccess,
                managerSquads: action.payload
            });

        case SquadActions.GET_MANAGER_SQUADS_FAILURE:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.getFailure
            });

        case SquadActions.SET_MANAGER_SQUAD_STATUS_IDLE:
            return Object.assign({}, state, {
                managerSquadStatus: SquadStatus.idle
            });

        default:
            return Object.assign({}, state);
    }

}
