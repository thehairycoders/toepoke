import { ISquad, IUser } from '../../../models';
import * as RootStore from '../../../store';
import { SquadActions, UserActions } from '../../../store/actions';
import { SquadState } from '../../../store/reducers/squad';
import { UserState } from '../../../store/reducers/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: FirebaseObjectObservable<IUser>;
  playerSquads: Array<FirebaseObjectObservable<ISquad>>;
  storeSubscriptions: Array<Subscription> = [];

  constructor(
    private store: Store<RootStore.AppState>,
    private userActions: UserActions,
    private squadActions: SquadActions,
    private router: Router) {
  }

  ngOnInit() {
    this.subscribeToStore();
    this.store.dispatch(this.userActions.getUser());
    this.store.dispatch(this.squadActions.getPlayerSquads());
  }

  ngOnDestroy() {
    this.storeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.userState).subscribe(state => this.handleUserState(state)));
    this.storeSubscriptions.push(this.store.select(store => store.squadState).subscribe(state => this.handleSquadState(state)));
  }

  private handleUserState(state: UserState) {
    this.user = state.user;
  }

  private handleSquadState(state: SquadState) {
    this.playerSquads = state.playerSquads;
  }

}
