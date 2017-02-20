import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { NotifyService } from '../../services';
import { AuthActions, NotifyActions } from '../actions';
import { StoreModule } from '@ngrx/store';

@Injectable()
export class NotifyEffects {

    constructor(
        private actions$: Actions,
        private notifyActions: NotifyActions,
        private notifyService: NotifyService
    ) { }

    @Effect() showMessage$ = this.actions$
        .ofType(AuthActions.LOGIN_FAILURE, AuthActions.REGISTER_FAILURE, AuthActions.REGISTER_SUCCESS)
        .switchMap(action => Observable.of({ type: NotifyActions.SHOW_MESSAGE, payload: this.notifyService.getMessageForAction(action.type, action.payload) }));

    @Effect() removeMessage$ = this.actions$
        .ofType(NotifyActions.SHOW_MESSAGE)
        .switchMap(() => Observable.of({ type: NotifyActions.REMOVE_MESSAGE }));
               
}