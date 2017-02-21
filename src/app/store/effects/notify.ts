import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NotifyService } from '../../services';
import { AuthActions, NotifyActions } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NotifyEffects {

    @Effect() showMessage$ = this.actions$
        .ofType(
            AuthActions.LOGIN_FAILURE, 
            AuthActions.REGISTER_FAILURE, 
            AuthActions.REGISTER_SUCCESS, 
            AuthActions.PASSWORD_RESET_FAILURE,
            AuthActions.PASSWORD_RESET_SUCCESS)
        .switchMap(action =>
            Observable.of(
                { type: NotifyActions.SHOW_MESSAGE, payload: this.notifyService.getMessageForAction(action.type, action.payload) }
            ));

    @Effect() removeMessage$ = this.actions$
        .ofType(NotifyActions.SHOW_MESSAGE)
        .switchMap(() => Observable.of({ type: NotifyActions.REMOVE_MESSAGE }));

    constructor(
        private actions$: Actions,
        private notifyActions: NotifyActions,
        private notifyService: NotifyService
    ) { }

}
