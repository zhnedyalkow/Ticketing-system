import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    public rForm: FormGroup;
    public date: Date = new Date();

    public email: string = '';
    public password: string = '';
    public emailErrMsg: string = 'Email is required!';
    public pwdErrMsg: string = 'Password is required!';
    public minEmailLen: string = 'Min length should be more than 8 chars!';
    public maxEmailLen: string = 'Max Length should be less than 50 chars!';
    public minPassLen: string = 'Min length should be more than 10 chars!';

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
                    Validators.pattern("[^ @]*@[^ @]*"),
                    Validators.minLength(10),
                    Validators.maxLength(50)])],
            'password': [null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)])],
        })
    }

    public loginUser(): void {
        this.auth.login(this.rForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
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
