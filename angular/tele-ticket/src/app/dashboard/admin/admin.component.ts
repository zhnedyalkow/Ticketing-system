import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../models/users/user.info';
import { AdminService } from '../shared/services/admin.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    adminForm: FormGroup;
    email: AbstractControl;
    addUserToCompany$: Observable<Object>;

    constructor(private adminService: AdminService, private fb: FormBuilder) { }

    ngOnInit() {
        this.adminForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.email,
            Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
        });

        this.email = this.adminForm.controls['email'];
    }

    AddUserToCompany() {
        this.adminService.addUserToCompany(this.email.value).subscribe((x) => {
            alert(x);
        });
    }

    onSubmit(value: any) {
        this.adminForm.reset();
    }
}
