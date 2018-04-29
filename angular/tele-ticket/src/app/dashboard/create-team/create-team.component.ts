import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DashboardService } from '../shared/services/dashboard.service';
import { TeamService } from '../shared/services/team.service';
import { TicketService } from '../shared/services/ticket.service';
import { AuthService } from '../../core/authentication/auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Team } from '../../models/teams/team';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-team',
    templateUrl: './create-team.component.html',
    styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

    public closeResult: string;
    public createTeamForm: FormGroup;
    public email: AbstractControl;
    public assignedUser: AbstractControl;
    public name: AbstractControl;
    public teams: Team[];

    constructor(
        private router: Router,
        private dashService: DashboardService,
        private teamService: TeamService,
        private ticketService: TicketService,
        private auth: AuthService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {

    }

    ngOnInit() {
        this.createTeamForm = this.fb.group({
            'name': [null,
                Validators.minLength(2)
            ],
            users: this.fb.array([
                this.buildItem(),
            ]),
        });

        this.email = this.createTeamForm.controls['email'];
        this.name = this.createTeamForm.controls['name'];
    }

    buildItem() {
        return new FormGroup({
            email: new FormControl(null,
                Validators.compose([
                    Validators.email,
                    Validators.pattern("[^ @]*@[^ @]*"),
                    Validators.minLength(10),
                    Validators.maxLength(50)])
            ),
        })
    }

    createTeam() {
        this.teamService.createTeam(this.createTeamForm.value).subscribe((data: Team) => {
            console.log(this.createTeamForm.value);
            this.router.navigate(['./dashboard/team/teamlist']);
            this.createTeamForm.reset();
        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
    }
