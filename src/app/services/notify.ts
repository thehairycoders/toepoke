import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from '../store/actions';
import * as RootStore from '../store';

@Injectable()
export class NotifyService {

  constructor() { }

  getMessageForAction(actionType: string, message?: string): string {

    switch (actionType) {
      case AuthActions.LOGIN_FAILURE:
        return message ? message : 'Failed to login';
      case AuthActions.REGISTER_FAILURE:
        return message ? message : 'Failed to register';
      case AuthActions.REGISTER_SUCCESS:
        return message ? message : 'Success! You registered';
    }

  }

}
