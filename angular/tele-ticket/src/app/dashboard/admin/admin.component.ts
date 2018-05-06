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
    public allUsers: UserInfo[] = [];

    public adminForm: FormGroup;
    public email: AbstractControl;

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private fb: FormBuilder,
        private toastr: ToastrService,
    ) {}

    public ngOnInit() {
        this.buildAdminForm();
        this.getAllUsers();
    }

    public buildAdminForm(): void {
        this.adminForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email,
            Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
        });
    }

    public addUserToCompany(): void {
        const userEmail = this.adminForm.value.email;

        this.adminService.addUserToCompany(userEmail).subscribe((data: UserInfo) => {
            this.allUsers.push(data);
            this.toastr.success(`User successfully added!`);
            this.adminForm.reset();
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }

    public getAllUsers(): void {
        this.userService.getAllUsers().subscribe((data: UserInfo[]) => {
            this.allUsers = data;
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }
}
