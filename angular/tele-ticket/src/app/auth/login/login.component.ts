import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHomeService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    public date: Date = new Date();

    public rForm: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;

    public genericErrorMsg: string = 'The field is required!';
    public genMinLengthMsg: string = 'Min length should be more than 8 chars!';
    public emailErrMsg: string = 'Invalid email! Eg. john.doe@gmail.com!';
    public genMaxLengthMsg: string = 'Max length should be less than 50 chars!';
    public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthHomeService,
        private toastr: ToastrService,
    ) { }
    ngOnInit() {
        this.buildLoginForm();
    }

    public buildLoginForm(): void {
        this.rForm = this.fb.group({
            'email': [null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(10),
                    Validators.maxLength(50),
                    Validators.pattern(this.emailPattern),
                ]
                )],
            'password': [null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)]
                ) ],
        })
    }

    public loginUser(): void {
        const user = {
            email: this.rForm.value.email,
            password: this.rForm.value.password,
        };
        this.auth.login(user, { observe: 'response', responseType: 'json' }).subscribe((x: {
            message: string,
            token: string,
        }) => {
            localStorage.setItem('token', x.token);
            this.toastr.success(`Well done! You successfully logged in to this website!`);
            this.router.navigate(['./']);
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
        this.rForm.reset();
    }
}
