import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NotifyActions {

  static SHOW_MESSAGE = 'SHOW_MESSAGE';
  static REMOVE_MESSAGE = "REMOVE_MESSAGE";

}