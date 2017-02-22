import { ISquad } from '../../../../models/squad';
import { IAuthCredentials } from '../../../../models/auth-credentials';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';

@Component({
    selector: 'app-squad-form',
    templateUrl: './squad-form.component.html',
    styleUrls: ['./squad-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquadFormComponent implements OnInit {

    form: FormGroup;
    formSubmitted = false;
    submitOnEnter = true;

    @Input() formTitle: string;
    @Output() formSubmitEvent: EventEmitter<ISquad> = new EventEmitter<ISquad>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            location: ['', Validators.required]
        });

    }
    
    setLocation(event) {
        this.form.patchValue({ location: event.formatted_address });
    }

    disableSubmitOnEnter() {
        this.submitOnEnter = false;
    }

    enableSubmitOnEnter() {
        this.submitOnEnter = true;
    }

    submit(): void {

        if (!this.submitOnEnter) return;

        this.formSubmitted = true;

        if (this.form.valid) {
            this.formSubmitEvent.next(this.form.value);
        }

    }

}
