import { IUser } from '../../../../models';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversalValidators } from 'ng2-validators';

@Component({
    selector: 'app-welcome-form',
    templateUrl: './welcome-form.component.html',
    styleUrls: ['./welcome-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeFormComponent implements OnInit {

    form: FormGroup;
    formSubmitted = false;
    googlePlacesLookupOptions: any = { componentRestrictions: { country: 'UK' } };
    submitOnEnter = true;

    @Output() formSubmitEvent: EventEmitter<IUser> = new EventEmitter<IUser>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            surname: ['', Validators.required],
            location: [''],
            mobileNumber: ['']
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
