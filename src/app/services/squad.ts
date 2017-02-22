import { IFirebaseKey } from '../models/firebase-key';
import { ISquad } from '../models';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class SquadService {

  rootRef = firebase.database().ref();

  constructor(public angularFire: AngularFire) { }

  getPlayerSquads(playerSquadIds: Array<IFirebaseKey> = []): Observable<Array<FirebaseObjectObservable<ISquad>>> {

    let playerSquadsRefs: Array<FirebaseObjectObservable<ISquad>> = [];

    for(let key in playerSquadIds) {
        playerSquadsRefs.push(this.angularFire.database.object(`/playerSquads/${key}`));
    }

    return Observable.of(playerSquadsRefs);
  }

   createSquad(userKey: string, squad: ISquad): firebase.Promise<void> {

    squad.createdDate = new Date().toISOString();

    let squadKey = this.rootRef.child('playersSquads').push().key;

    if (!squad.players) { squad.players = {}; }
    squad.players[userKey] = true;

    if (!squad.managers) { squad.managers = {}; }
    squad.managers[userKey] = true;

    const fanOutSquad = {};
    fanOutSquad[`playerSquads/${squadKey}`] = squad;
    fanOutSquad[`managerSquads/${squadKey}`] = squad;
    fanOutSquad[`userReadable/${userKey}/playerSquads/${squadKey}`] = true;
    fanOutSquad[`userReadable/${userKey}/managerSquads/${squadKey}`] = true;
    fanOutSquad[`userWriteable/${userKey}/playerSquads/${squadKey}`] = true;
    fanOutSquad[`userWriteable/${userKey}/managerSquads/${squadKey}`] = true;

    return this.angularFire.database.object(`/`).update(fanOutSquad);

  }
  
}
