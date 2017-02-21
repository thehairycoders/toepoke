import { IAuthCredentials } from '../../../../models/auth-credentials';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';

@Component({
    selector: 'app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordFormComponent implements OnInit {

    form: FormGroup;
    formSubmitted = false;

    @Output() formSubmitEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidators.simple()])]
        });

    }

    submit(): void {

        this.formSubmitted = true;

        if (this.form.valid) { 
            this.formSubmitEvent.next(this.form.controls['email'].value);
        }

    }

}
