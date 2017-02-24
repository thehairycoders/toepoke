import { SquadActions } from '../../../store/actions';
import { ISquad } from '../../../models/squad';
import { SquadStatus } from '../../../models/squad-status';
import { StoreDrivenComponent } from '../../../shared/store-driven.component';
import * as RootStore from '../../../store';
import { SquadState } from '../../../store/reducers/squad';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-squad',
  templateUrl: './add-squad.component.html',
  styleUrls: ['./add-squad.component.css']
})
export class AddSquadComponent extends StoreDrivenComponent implements OnInit {

  loading = false;

  constructor(
    private store: Store<RootStore.State>,
    private squadActions: SquadActions,
    private router: Router,
    private route: ActivatedRoute) {
    super(router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeToStore();
  }

  addSquad(squad: ISquad) {    
    this.store.dispatch(this.squadActions.createSquad(squad));
  }

  private subscribeToStore() {
    this.storeSubscriptions.push(this.store.select(store => store.squadState).subscribe(state => this.handleSquadState(state)));
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
