import { IUser } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getUsers(): FirebaseListObservable<any> {
    return this.angularFire.database.list(`/user`);
  }

  getUser(key: string): FirebaseObjectObservable<any> {
    return this.angularFire.database.object(`/user/${key}`);
  }

  initialiseUser(key: string, userData: IUser): firebase.Promise<void> {

    userData.registeredDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`user/${key}`] = userData;

    return this.angularFire.database.object(`/`).update(fanOutUser);

  }

}
