import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthHomeService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public rForm: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public verifyPass: AbstractControl;

    private validPassoword: string;
    public genericErrorMsg: string = 'The field is required!';
    public genMinLengthMsg: string = 'Min length should be more than 8 chars!';
    public emailErrMsg: string = 'Invalid email! Eg. john.doe@gmail.com!';
    public genMaxLengthMsg: string = 'Max length should be less than 50 chars!';
    public confirmPwdErrMsg: string = 'Password does not match!!';
    public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    public date: Date = new Date();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthHomeService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.buildRegisterForm();
    }

    public buildRegisterForm(): void {
        this.rForm = this.fb.group({
            'name': [null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2)
                ])],
            'email': [null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern(this.emailPattern),
                ])],
            'password': [null, 
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)]
            )],
            'verifyPass': [null, [Validators.required]],
        }, { validator: this.passwordConfirming });
    }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('verifyPass').value) {
            return { invalid: true };
        }
    }

    public registerUser(): void {
        const user = {
            name: this.rForm.value.name,
            email: this.rForm.value.email,
            password: this.rForm.value.password,
        };

        this.auth.register(user, { observe: 'response', responseType: 'json' })
            .subscribe((data: { info: boolean }) => {
                this.toastr.success(`Registration was successfull! You can log in!`);
                this.router.navigate(['./home/login']);
            }, (err: HttpErrorResponse) => {
                this.toastr.error(err.error.err);
            });
    }
}
