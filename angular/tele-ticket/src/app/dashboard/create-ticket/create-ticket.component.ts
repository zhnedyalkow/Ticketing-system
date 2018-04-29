import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { DashboardService } from '../shared/services/dashboard.service';
import { TicketService } from '../shared/services/ticket.service';
import { AuthService } from '../../core/authentication/auth.service';

import { Ticket } from '../../models/tickets/ticket';
import { Team } from '../../models/teams/team';

@Component({
    selector: 'app-create-ticket',
    templateUrl: './create-ticket.component.html',
    styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

    model;
    userInfo$: Observable<Object>;

    createTicketForm: FormGroup;
    email: AbstractControl;
    assignedUser: AbstractControl;
    name: AbstractControl;
    title: AbstractControl;
    description: AbstractControl;
    label: AbstractControl;
    dueDate: AbstractControl;
    teams: Team[];

    constructor(
        private router: Router,
        private dashService: DashboardService,
        private ticketService: TicketService,
        private auth: AuthService,
        private fb: FormBuilder,
        private parserFormatter: NgbDateParserFormatter
    ) {
        // this.allTickets = [];
    }

    ngOnInit() {
        this.userInfo$ = this.dashService.getUserInfo();
        
        this.createTicketForm = this.fb.group({
            'title': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'description': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'label': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            'dueDate': [null],
            'assignedUser': [null, Validators.compose([Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*"),
            Validators.minLength(10), Validators.maxLength(50)])],
            'teamId': [null]
        });

        this.getMyTeam();
    }

    createTicket() {
        console.log(this.createTicketForm.value);
        debugger;
        this.ticketService.createTicket(this.createTicketForm.value).subscribe((data: Ticket) => {
            console.log(this.createTicketForm.value);
            // console.log(data);
            this.router.navigate(['./dashboard/ticket/ticketlist']);
            this.createTicketForm.reset();
        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        })
    }   
    

    getMyTeam() {
        this.dashService.getMyTeams().subscribe((data) => {
            this.teams = data;
        });
    }
}
