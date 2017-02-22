import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService, SquadService } from '../../services';
import { SquadActions } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SquadEffects {
  
    @Effect() getPlayerSquads$ = this.actions$
        .ofType(SquadActions.GET_PLAYER_SQUADS_RECEIVED)
        .switchMap(() =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return this.userService.getPlayerSquads(authState.uid)
                            .switchMap((squads) => Observable.of(this.userActions.getPlayerSquadsSuccess(squads)))
                            .catch(error => Observable.of(this.userActions.getPlayerSquadsFailure(error.message)));
                    } else {
                        return Observable.of({ type: SquadActions.GET_PLAYER_SQUADS_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: SquadActions.GET_PLAYER_SQUADS_FAILURE, payload: 'You must be logged in' }))
        );
 
    @Effect() setPlayerSquadStateToIdle$ = this.actions$
        .ofType(
        SquadActions.GET_PLAYER_SQUADS_FAILURE,
        SquadActions.GET_PLAYER_SQUADS_SUCCESS)
        .switchMap(() => Observable.of({ type: SquadActions.SET_PLAYER_SQUAD_STATUS_IDLE }));
        
    @Effect() getManagerSquads$ = this.actions$
        .ofType(SquadActions.GET_MANAGER_SQUADS_RECEIVED)
        .switchMap(() =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return this.userService.getManagerSquads(authState.uid)
                            .switchMap((squads) => Observable.of(this.userActions.getManagerSquadsSuccess(squads)))
                            .catch(error => Observable.of(this.userActions.getManagerSquadsFailure(error.message)));
                    } else {
                        return Observable.of({ type: SquadActions.GET_MANAGER_SQUADS_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: SquadActions.GET_MANAGER_SQUADS_FAILURE, payload: 'You must be logged in' }))
        );

    @Effect() setManagerSquadStateToIdle$ = this.actions$
        .ofType(
        SquadActions.GET_MANAGER_SQUADS_FAILURE,
        SquadActions.GET_MANAGER_SQUADS_SUCCESS)
        .switchMap(() => Observable.of({ type: SquadActions.SET_MANAGER_SQUAD_STATUS_IDLE }));

    constructor(
        private actions$: Actions,
        private userActions: SquadActions,
        private authService: AuthService,
        private userService: SquadService
    ) { }

}
