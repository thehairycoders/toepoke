import { Action } from '@ngrx/store';
import { NotifyActions } from './../actions';

export interface NotifyState {
    message: string
}

const initialState: NotifyState = {
    message: null
};

export default function (state = initialState, action: Action): NotifyState {

    switch (action.type) {

        case NotifyActions.SHOW_MESSAGE:
            return Object.assign({}, state, {
                message: action.payload
            });

        case NotifyActions.REMOVE_MESSAGE:
            return Object.assign({}, state, {
                message: null
            });

        default:
            return Object.assign({}, state);
    }

}