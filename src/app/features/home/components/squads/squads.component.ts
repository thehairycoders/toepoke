import { ISquad } from '../../../../models/squad';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-squads',
    templateUrl: './squads.component.html',
    styleUrls: ['./squads.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquadsComponent implements OnInit {

    @Input() title: string;
    @Input() squads: FirebaseListObservable<ISquad>;

    constructor() { }

    ngOnInit() { }

}
