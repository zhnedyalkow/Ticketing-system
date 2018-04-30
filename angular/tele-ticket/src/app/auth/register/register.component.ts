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

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthHomeService,
        private toastr: ToastrService,
    ) { }

    public ngOnInit(): void {
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
    public registerUser() {
        this.auth.register(this.rForm.value, { observe: 'response', responseType: 'json' }).subscribe((x: {
            info: any,
        }) => {
            if (x.info == true) {
                this.toastr.success(`Registration was successfull! You can log in!`);
                this.router.navigate(['./home/login']);
            } else {
                alert(x.info);
                this.toastr.error(`${x.info}`);

            }
        }, (err: HttpErrorResponse) => {
            if (err.status === 302) {
                this.toastr.error(err.error.err);
            }
        });
    }

    public onSubmit(value: any): void {
        this.rForm.reset();
    }

}
