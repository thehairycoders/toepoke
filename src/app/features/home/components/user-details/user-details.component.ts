import { IUser } from '../../../../models';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

    @Input() user: FirebaseObjectObservable<IUser>;

    constructor() { }

    ngOnInit() { }

}
