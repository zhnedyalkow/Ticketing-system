import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    rForm: FormGroup;
    post: any;
    email: string = '';
    password: string = '';
    errMsg: string = 'Length of this field must be between 10 and 50 characters';
    test: Date = new Date();

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(10), Validators.maxLength(50)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        })
    }

    ngOnInit() {
        this.rForm = this.fb.group({
            email: '',
            password: ''
        });
    }

}
