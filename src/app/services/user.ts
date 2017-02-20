import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFire, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { IUser } from '../models';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getUsers(): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/userReadable`);
  }  

  initialiseUser(userData: IUser): firebase.Promise<void> {

    let key = this.rootRef.child('/userWriteable').push().key;

    userData.registeredDate = new Date().toISOString();

    let fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.angularFire.database.object(`/`).update(fanOutUser);

  }

}