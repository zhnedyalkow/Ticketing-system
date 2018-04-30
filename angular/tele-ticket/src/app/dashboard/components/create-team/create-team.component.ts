import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DashboardService } from '../../shared/services/dashboard.service';
import { TeamService } from '../../shared/services/team.service';
import { TicketService } from '../../shared/services/ticket.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Team } from '../../../models/teams/team';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateTeam } from '../../shared/interfaces/create-team.interface';
import { ValidateInputFormFields } from '../../shared/validators/create-team-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-team',
    templateUrl: './create-team.component.html',
    styleUrls: ['./create-team.component.scss'],
})

export class CreateTeamComponent implements OnInit {

    public closeResult: string;
    public email: AbstractControl;
    public name: AbstractControl;
    public createTeamForm: FormGroup;
    public genericErrorMsg: string = 'The field is required!';
    public emailErrMsg: string = 'Invalid email! Eg. john.doe@gmail.com!';
    public minLenName: string = 'Min length should be more than 2 chars!';
    public genMinLengthMsg: string = 'Min length should be more than 8 chars!';
    public genMaxLengthMsg: string = 'Max Length should be less than 50 chars!';
    public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private teamService: TeamService,
        public activeModal: NgbActiveModal,
        private toastr: ToastrService
    ) {

    }
    public ngOnInit(): void {

        this.createTeamForm = this.fb.group({
            'name': [null,
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
            ],
            users: this.fb.array([
                this.buildItem(),
            ]),
        });
    }
    public buildItem(): any {
        return new FormGroup({
            email: new FormControl(null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.pattern(this.emailPattern),
                ])
            ),
        })
    }

    public createTeam(): void {
        this.teamService.createTeam(this.createTeamForm.value).subscribe((data: Team) => {
            this.toastr.success(`Team was successfully created!`);
            this.router.navigate(['./team/teamlist']);
            this.activeModal.close();
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }
}
