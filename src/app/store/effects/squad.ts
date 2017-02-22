import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService, SquadService, UserService } from '../../services';
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
                        return this.userService.getUser(authState.uid)
                            .switchMap((user) => 
                                this.squadService.getPlayerSquads(user.playerSquads)
                                    .switchMap((squads) => Observable.of(this.squadActions.getPlayerSquadsSuccess(squads)))
                                    .catch(error => Observable.of(this.squadActions.getPlayerSquadsFailure(error.message))))
                             .catch(error => Observable.of(this.squadActions.getPlayerSquadsFailure(error.message)))
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

     @Effect() initialiseUser$ = this.actions$
        .ofType(SquadActions.CREATE_SQUAD_RECEIVED)
        .map(toPayload)
        .switchMap(payload =>
            this.authService.angularFire.auth
                .switchMap(authState => {

                    if (authState) {
                        return Observable.fromPromise(<Promise<void>>this.squadService.createSquad(authState.uid, payload))
                            .switchMap(() => Observable.of({ type: SquadActions.CREATE_SQUAD_SUCCESS }))
                            .catch(error => Observable.of({ type: SquadActions.CREATE_SQUAD_FAILURE }));
                    } else {
                        return Observable.of({ type: SquadActions.CREATE_SQUAD_FAILURE, payload: 'You must be logged in' });
                    }

                })
                .catch(error => Observable.of({ type: SquadActions.CREATE_SQUAD_FAILURE, payload: 'You must be logged in' }))
        );

    @Effect() setManagerSquadStateToIdle$ = this.actions$
        .ofType(
        SquadActions.CREATE_SQUAD_FAILURE,
        SquadActions.CREATE_SQUAD_SUCCESS)
        .switchMap(() => Observable.of({ type: SquadActions.SET_MANAGER_SQUAD_STATUS_IDLE }));

    constructor(
        private actions$: Actions,
        private squadActions: SquadActions,
        private authService: AuthService,
        private userService: UserService,
        private squadService: SquadService
    ) { }

}
