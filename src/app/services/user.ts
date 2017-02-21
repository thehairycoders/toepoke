import { IUser } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getUsers(): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/userReadable`);
  }

  getUser(key: string): FirebaseObjectObservable<any> {
    return this.angularFire.database.object(`/userWriteable/${key}`);
  }

  initialiseUser(key: string, userData: IUser): firebase.Promise<void> {

    userData.registeredDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.angularFire.database.object(`/`).update(fanOutUser);

  }

}
