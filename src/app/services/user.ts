import { IUser } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(public angularFire: AngularFire) { }

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
