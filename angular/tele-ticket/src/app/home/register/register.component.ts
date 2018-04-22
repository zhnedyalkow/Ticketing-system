import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHomeService } from '../services/auth.home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    rForm: FormGroup;
    name: string = '';
    email: string = '';
    password: string = '';
    verifyPass: string = '';
    field: string = '';

    errMsg: string = 'Name is required!';
    pwdErrMsg: string = 'The password does not seem right';
    emailErrMsg: string = 'Email is required!';

    emailPattErr: string = 'The email address must contain at least @ character';
    confirmPwd: string = 'Please verify your password!';
    test: Date = new Date();

    constructor(private auth: AuthHomeService, private router: Router, private fb: FormBuilder) {
        this.rForm = this.fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'email': ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*"), 
                            Validators.minLength(6), Validators.maxLength(50)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'verifyPass': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        })
    }
    ngOnInit() {
        this.rForm = this.fb.group({
            name: '',
            email: '',
            password: '',
            verifyPass: ''
        });
    }
    isFieldValid(field: string) {
        return !this.rForm.get(field).valid && this.rForm.get(field).touched;
    };

    registerUser() {
        this.auth.register(this.rForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
            info: any,
        }) => {
            if (x.info == true ) {
                this.router.navigate(['./login']);
            } else {
                alert(x.info);
            }
        }, (err: HttpErrorResponse) => {
            if (err.status === 302) {
                alert(err.error.err);
            }
        });
    }

    onSubmit(value: any) {
        this.rForm.reset();
    }
}
