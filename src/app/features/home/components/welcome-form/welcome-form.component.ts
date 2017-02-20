import { IUser } from '../../../../models';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-welcome-form',
    templateUrl: './welcome-form.component.html',
    styleUrls: ['./welcome-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeFormComponent implements OnInit {

    form: FormGroup;
    formSubmitted = false;

    @Output() formSubmitEvent: EventEmitter<IUser> = new EventEmitter<IUser>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            name: ['', Validators.required]
        });

    }

    skipInitialisation(): void {
        this.formSubmitEvent.next({ name: 'anonymous' });
    }

    submit(): void {
        
        this.formSubmitted = true;

        if (this.form.valid) { 
            this.formSubmitEvent.next(this.form.value);
        }

    }

}
