import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHomeService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    rForm: FormGroup;
    email: string = '';
    password: string = '';
    test: Date = new Date();

    emailErrMsg: string = 'Email is required!';
    pwdErrMsg: string = 'Password is required!';
    minEmailLen: string = 'Min length should be more than 8 chars!';
    maxEmailLen: string = 'Max Length should be less than 50 chars!';
    minPassLen: string = 'Min length should be more than 10 chars!';

    constructor(private router: Router, private fb: FormBuilder, private auth: AuthHomeService) { }
    ngOnInit() {
        this.rForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        })
    }

    loginUser() {
        this.auth.login(this.rForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
            message: string,
            token: string,
        }) => {
            if (x.message === 'ok') {
                localStorage.setItem('token', x.token);
                this.router.navigate(['./dashboard']);
            } else {
                alert(x.message);
            }
        }, (err: HttpErrorResponse) => {
            if (err.status === 302) {
                alert(err.error.err);
            }
        });
        this.rForm.reset();
    }
}
