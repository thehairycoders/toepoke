import { IUser } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getUsers(): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/userReadable`);
  }

  initialiseUser(userData: IUser): firebase.Promise<void> {

    const key = this.rootRef.child('/userWriteable').push().key;

    userData.registeredDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.angularFire.database.object(`/`).update(fanOutUser);

  }

}
