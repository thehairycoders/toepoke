import { AuthActions, NotifyActions, UserActions } from './actions';
import { AuthEffects, NotifyEffects, UserEffects } from './effects';
import * as fromAuth from './reducers/auth';
import * as fromNotify from './reducers/notify';
import * as fromUser from './reducers/user';
import { NgModule } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from 'ngrx-store-logger';

export interface AppState {
  authState: fromAuth.AuthState;
  notifyState: fromNotify.NotifyState;
  userState: fromUser.UserState;
};

export const actions = [
  AuthActions,
  NotifyActions,
  UserActions
];

export const composeStore = compose(
  storeLogger(),
  localStorageSync(['authState']),
  combineReducers)
  ({
    authState: fromAuth.default,
    notifyState: fromNotify.default,
    userState: fromUser.default
  });

export function reducer(state: any, action: any) {
 return composeStore(state, action);
}

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(NotifyEffects),
    EffectsModule.run(UserEffects)
  ],
  declarations: [],
  exports: [],
  providers: [...actions]
})

export class SharedStoreModule { };
