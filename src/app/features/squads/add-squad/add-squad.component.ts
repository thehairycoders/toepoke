import { ISquad } from '../../../models/squad';
import { SquadStatus } from '../../../models/squad-status';
import * as RootStore from '../../../store';
import { SquadActions } from '../../../store/actions';
import { SquadState } from '../../../store/reducers/squad';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-squad',
  templateUrl: './add-squad.component.html',
  styleUrls: ['./add-squad.component.css']
})
export class AddSquadComponent implements OnInit, OnDestroy {

  loading = false;
  squadStoreSubscription: Subscription;

  constructor(
    private store: Store<RootStore.AppState>,
    private squadActions: SquadActions,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.squadStoreSubscription = this.store.select(store => store.squadState).subscribe(state => this.handleSquadState(state));
  }

  ngOnDestroy() {
    this.squadStoreSubscription.unsubscribe();
  }

  addSquad(squad: ISquad) {    
    this.store.dispatch(this.squadActions.createSquad(squad));
  }

  private handleSquadState(state: SquadState) {
    this.toggleLoader(state.managerSquadStatus);
    this.redirectOnSuccess(state.managerSquadStatus);
  }

  private toggleLoader(squadStatus: SquadStatus): void {
    this.loading = squadStatus === SquadStatus.updateInProgress;
  }

  private redirectOnSuccess(status: SquadStatus): void {
    if(status === SquadStatus.updateSuccess) {
      this.router.navigate(['/dashboard']);
    }
  }

}
