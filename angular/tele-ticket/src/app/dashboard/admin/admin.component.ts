import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../models/users/user.info';
import { AdminService } from '../shared/services/admin.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    adminForm: FormGroup;
    email: AbstractControl;
    addUserToCompany$: Observable<Object>;

    @Input() allUsers: UserInfo[];

    constructor(private adminService: AdminService, private fb: FormBuilder) {
        this.allUsers = [];
     }

    ngOnInit() {
        this.adminForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email,
            Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
        });

        this.email = this.adminForm.controls['email'];

        this.getAllUsers();
    }

    AddUserToCompany() {
        this.adminService.addUserToCompany(this.email.value).subscribe((x: UserInfo) => {
            this.allUsers.push(x);
        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        });
    }

    getAllUsers() {
        this.adminService.getAllUsers().subscribe((x) => {
            this.allUsers = x;
            console.log(x);
        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        });
    }

    onSubmit(value: any) {
        this.adminForm.reset();
    }
}
