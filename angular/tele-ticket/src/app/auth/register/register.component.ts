import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    public name: string = '';
    public email: string = '';
    public password: string = '';
    public verifyPass: string = '';
    public field: string = '';

    public errMsg: string = 'Name is required!';
    public pwdErrMsg: string = 'The password does not seem right';
    public emailErrMsg: string = 'Email is required!';

    public emailPattErr: string = 'The email address must contain at least @ character';
    public confirmPwd: string = 'Please verify your password!';
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
            'name': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2)
                ])],
            'email': ['',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.pattern("[^ @]*@[^ @]*"),
                    Validators.minLength(6),
                    Validators.maxLength(50)
                ])],
            'password': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ])],
            'verifyPass': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ])],
        })
    }

    public registerUser(): void {
        this.auth.register(this.rForm.value, { observe: 'response', responseType: 'json' })
            .subscribe((data: { info: boolean }) => {
                this.toastr.success(`Registration was successfull! You can log in!`);
                this.router.navigate(['./home/login']);
            }, (err: HttpErrorResponse) => {
                this.toastr.error(err.error.err);
            });
    }
}
