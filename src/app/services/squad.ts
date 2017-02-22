import { ISquad } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class SquadService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getPlayerSquads(key:string): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/playerSquads/${key}`);
  }

  getManagerSquads(key:string): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/managerSquads/${key}`);
  }
  
}
