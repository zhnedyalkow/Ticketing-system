import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../models/users/user.info';
import { AdminService } from '../shared/services/admin.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public adminForm: FormGroup;
    public email: AbstractControl;
    public addUserToCompany$: Observable<Object>;

    @Input() allUsers: UserInfo[];

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private fb: FormBuilder,
        private toastr: ToastrService,
    ) {
        this.allUsers = [];
    }

    public ngOnInit() {
        this.adminForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email,
            Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
        });

        this.email = this.adminForm.controls['email'];
        this.getAllUsers();
    }

    public AddUserToCompany(): void {
        this.adminService.addUserToCompany(this.email.value).subscribe((x: UserInfo) => {
            this.allUsers.push(x);
            this.toastr.success(`User successfully added!`);
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }

    public getAllUsers(): void {
        this.userService.getAllUsers().subscribe((x) => {
            this.allUsers = x;
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }

    public onSubmit(value: any): void {
        this.adminForm.reset();
    }
}

