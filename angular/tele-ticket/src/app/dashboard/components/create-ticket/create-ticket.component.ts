import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DashboardService } from '../../shared/services/dashboard.service';
import { TicketService } from '../../shared/services/ticket.service';
import { AuthService } from '../../../core/authentication/auth.service';

import { Ticket } from '../../../models/tickets/ticket';
import { Team } from '../../../models/teams/team';

import { DatepickerValidationService } from './validator/datepicker-validator-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-ticket',
    templateUrl: './create-ticket.component.html',
    styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

    public ticketId: number;
    public teams: Team[];
    public email: AbstractControl;
    public name: AbstractControl;
    public title: AbstractControl;
    public description: AbstractControl;
    public label: AbstractControl;
    public dueDate: AbstractControl;
    public teamId: AbstractControl;
    public assignedUser: AbstractControl;
    public createTicketForm: FormGroup;
    public userInfo$: Observable<Object>;
    public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    public genericErrorMsg: string = 'The field is required!';
    public dateErrMsg: string = 'Invalid Date!';
    public emailErrMsg: string = 'Invalid email! Eg. john.doe@gmail.com!';
    public labelMinLenErrMsg: string = "Min length should be more than 3 chars!";
    public genMinLengthMsg: string = "Min length should be more than 8 chars!";
    public genMaxLengthMsg: string = "Max length should be more than 50 chars!";

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        private dashService: DashboardService,
        private ticketService: TicketService,
        private toastr: ToastrService,
        private dateValidatorService: DatepickerValidationService,
    ) {
   
     }

    public ngOnInit(): void {
        this.userInfo$ = this.dashService.getUserInfo();
        this.createTicketForm = this.fb.group({
            'title': [null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                ])],
            'description': [null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50),
                ])],
            'label': [null, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ])],
            'dueDate': [null, this.dateValidatorService.isDate],
            'assignedUser': [null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.pattern(this.emailPattern),
                    Validators.minLength(10),
                    Validators.maxLength(50)])],
            'teamId': [null,
                Validators.required]
        });
        this.getMyTeam();
    }

    public createTicket(): void{
        this.ticketService.createTicket(this.createTicketForm.value).subscribe((data: Ticket) => {
            this.toastr.success(`Ticket was successfully created!`);
            this.activeModal.close();
            this.router.navigate([`./ticket/${data.id}`]);
            this.createTicketForm.reset();
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        })
    }

    public getMyTeam(): void {
        this.dashService.getMyTeams().subscribe((data) => {
            this.teams = data;
        });
    }
}
