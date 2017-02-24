import { getPasswordResetStatus } from '../../../store';
import * as RootStore from '../../../store';
import { AuthActions } from '../../../store/actions';
import { State } from '../../../store/reducers/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActionStatus } from './../../../models';

@Component({
  selector: 'app-reset-password-success',
  templateUrl: './reset-password-success.component.html',
  styleUrls: ['./reset-password-success.component.css']
})
export class ResetPasswordSuccessComponent {
  
  email$: Observable<string>;

  constructor(
    private store: Store<RootStore.State>,
    private authActions: AuthActions,
    private router: Router) {

    this.email$ = store.select(RootStore.getPasswordResetEmail);
    
  }

}
