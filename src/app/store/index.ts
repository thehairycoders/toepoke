import { SquadStatus } from '../models/squad-status';
import { AuthActions, NotifyActions, UserActions, SquadActions } from './actions';
import { AuthEffects, NotifyEffects, UserEffects, SquadEffects } from './effects';
import * as fromAuth from './reducers/auth';
import * as fromNotify from './reducers/notify';
import * as fromSquad from './reducers/squad';
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
  squadState: fromSquad.SquadState;
};

export const actions = [
  AuthActions,
  NotifyActions,
  UserActions,
  SquadActions
];

export const composeStore = compose(
  storeLogger(),
  localStorageSync(['authState']),
  combineReducers)
  ({
    authState: fromAuth.default,
    notifyState: fromNotify.default,
    userState: fromUser.default,
    squadState: fromSquad.default
  });

export function reducer(state: any, action: any) {
 return composeStore(state, action);
}

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(NotifyEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(SquadEffects)
  ],
  declarations: [],
  exports: [],
  providers: [...actions]
})

export class SharedStoreModule { };
