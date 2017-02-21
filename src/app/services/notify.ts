import { AuthActions } from '../store/actions';
import { Injectable } from '@angular/core';

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
      case AuthActions.PASSWORD_RESET_FAILURE:
        return message ? message : 'Failed to send password reset email';
      case AuthActions.PASSWORD_RESET_SUCCESS:
        return message ? message : 'Success! Please check your email';
    }

  }

}
