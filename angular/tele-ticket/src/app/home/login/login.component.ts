import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthHomeService } from '../services/auth.home.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'util';
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

    constructor(private auth: AuthHomeService, private router: Router, private fb: FormBuilder) {
        this.rForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*"),
                            Validators.minLength(10), Validators.maxLength(50)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        })
    }

    ngOnInit() {
        this.rForm = this.fb.group({
            email: '',
            password: ''
        });
    }

    loginUser(rForm) {
        this.auth.login(rForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
            message: string,
            token: string,
        }) => {
            if (x.message === 'ok') {
                localStorage.setItem('token', x.token);
                this.router.navigate(['./']);
            } else {
                alert(x.message);
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
