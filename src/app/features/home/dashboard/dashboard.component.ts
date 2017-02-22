import { ISquad, IUser } from '../../../models';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { SquadActions, UserActions } from '../../../store/actions';
import { SquadState } from '../../../store/reducers/squad';
import { UserState } from '../../../store/reducers/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends StoreDrivenComponent implements OnInit {

  user: FirebaseObjectObservable<IUser>;
  playerSquads: Array<FirebaseObjectObservable<ISquad>>;
  managerSquads: FirebaseListObservable<ISquad>;

  constructor(
    private store: Store<RootStore.AppState>,
    private userActions: UserActions,
    private squadActions: SquadActions,
    private router: Router) {
    super(router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeToStore();
    this.store.dispatch(this.userActions.getUser());
    this.store.dispatch(this.squadActions.getPlayerSquads());
   // this.store.dispatch(this.squadActions.getManagerSquads());
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
    //this.managerSquads = state.managerSquads;
  }

}
