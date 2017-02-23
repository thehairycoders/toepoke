import { FirebaseObjectObservable } from 'angularfire2/database';
import { IUser, UserStatus } from '../../models';
import { UserActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseListObservable } from 'angularfire2';

export interface UserState {
    user: FirebaseObjectObservable<IUser>;
    status: UserStatus;
}

const initialState: UserState = {
    user: null,
    status: UserStatus.idle
};

export default function (state = initialState, action: Action): UserState {

    switch (action.type) {
    
        case UserActions.GET_USER_RECEIVED:
            return Object.assign({}, state, {
                status: UserStatus.getUserInProgress
            });

        case UserActions.GET_USER_SUCCESS:
            return Object.assign({}, state, {
                status: UserStatus.getUserSuccess,
                user: action.payload
            });

        case UserActions.GET_USER_FAILURE:
            return Object.assign({}, state, {
                status: UserStatus.getUserFailure
            });

        case UserActions.INITIALISE_USER_RECEIVED:
            return Object.assign({}, state, {
                status: UserStatus.updateInProgress
            });

        case UserActions.INITIALISE_USER_SUCCESS:
            return Object.assign({}, state, {
                status: UserStatus.updateSuccess
            });

        case UserActions.INITIALISE_USER_FAILURE:
            return Object.assign({}, state, {
                status: UserStatus.updateFailure
            });

        case UserActions.SET_USER_STATUS_IDLE:
            return Object.assign({}, state, {
                status: UserStatus.idle
            });

        default:
            return Object.assign({}, state);
    }

}
