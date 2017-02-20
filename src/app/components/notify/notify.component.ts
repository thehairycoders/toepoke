import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';

@Component({
  selector: 'app-notify',
  template: ''
})
export class NotifyComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>, private snackbar: MdSnackBar) { }

  ngOnInit() {
      
      this.store.select(store => store.notifyState).subscribe(state => {
      
      this.showMessage(state.message);
      
    });

  }

  private showMessage(message: string) {
    if (message) this.snackbar.open(message, 'close', { duration: 3000 });
  }

}
