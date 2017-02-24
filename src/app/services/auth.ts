import 'rxjs/add/observable/fromPromise';
import { IAuthCredentials } from '../models';
import * as RootStore from '../store';
import { AuthActions } from '../store/actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private uid: string = null;

  constructor(public angularFire: AngularFire,
    private authActions: AuthActions,
    private store: Store<RootStore.State>) {

    this.angularFire.auth.subscribe((auth: FirebaseAuthState) => {

      if (auth) {
        this.uid = auth.uid;
        this.store.dispatch(this.authActions.userAuthenticated(auth));
      } else {
        this.uid = null;
        this.store.dispatch(this.authActions.userNotAuthenticated());
      }

    });

  }

  login(credentials: IAuthCredentials): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.angularFire.auth.login(credentials));
  }

  resetPassword(email: string): Observable<any> {
    return Observable.fromPromise(<Promise<any>>firebase.auth().sendPasswordResetEmail(email));
  }

  logout(): void {
    this.angularFire.auth.logout();
  }

  register(credentials: IAuthCredentials): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.angularFire.auth.createUser(credentials));
  }

}
