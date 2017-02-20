import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EmailValidators } from 'ng2-validators';
import { IAuthCredentials } from '../../../../models/auth-credentials';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

    form: FormGroup;
    formSubmitted: boolean = false;

    @Input() formTitle: string;
    @Output() formSubmitEvent: EventEmitter<IAuthCredentials> = new EventEmitter<IAuthCredentials>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidators.simple()])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

    }

    submit(): void {

        this.formSubmitted = true;

        if (this.form.valid) this.formSubmitEvent.next(this.form.value);

    }

}
