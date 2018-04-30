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

@Component({
    selector: 'app-create-team',
    templateUrl: './create-team.component.html',
    styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent extends ValidateInputFormFields implements ICreateTeam, OnInit {

    public closeResult: string;
    public createTeamForm: FormGroup;
    public email: AbstractControl;
    public name: AbstractControl;

    private errors: any = '';

    public genericError: string = 'The field is required!';
    public minLenName: string = 'Min length should be more than 2 chars!';
    public minLenEmail: string = 'Min length should be more than 8 chars!';
    public maxLength: string = 'Max Length should be less than 50 chars!';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private teamService: TeamService,
        public activeModal: NgbActiveModal,
    ) {
        super();
    }
    public ngOnInit() {

        this.createTeamForm = this.fb.group({
            'name': [null,
                Validators.minLength(2)
            ],
            users: this.fb.array([
                this.buildItem(),
            ]),
        });
    }
    buildItem() {
        return new FormGroup({
            email: new FormControl(null,
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.email,
                    Validators.pattern("[^ @]*@[^ @]*")])
            ),
        })
    }

    createTeam(): void {
        console.log(this.createTeamForm);
        this.teamService.createTeam(this.createTeamForm.value).subscribe((data: Team) => {
            this.router.navigate(['./team/teamlist']);
            this.activeModal.close();
        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        });
    }
}





// import { Component, OnInit, Input } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
// import { Router } from '@angular/router';

// import { DashboardService } from '../../shared/services/dashboard.service';
// import { TeamService } from '../../shared/services/team.service';
// import { TicketService } from '../../shared/services/ticket.service';
// import { AuthService } from '../../../core/authentication/auth.service';
// import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
// import { Team } from '../../../models/teams/team';
// import { HttpErrorResponse } from '@angular/common/http';
// import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ICreateTeam } from '../../shared/interfaces/create-team.interface';
// import { ValidateInputFormFields } from '../../shared/validators/create-team-validator';

// @Component({
//     selector: 'app-create-team',
//     templateUrl: './create-team.component.html',
//     styleUrls: ['./create-team.component.scss'],
// })
// export class CreateTeamComponent extends ValidateInputFormFields implements ICreateTeam, OnInit {

//     public closeResult: string;
//     public createTeamForm: FormGroup;
//     public email: AbstractControl;
//     public name: AbstractControl;

//     private errors: any = '';

//     constructor(
//         private fb: FormBuilder,
//         private router: Router,
//         private teamService: TeamService,
//         public activeModal: NgbActiveModal,
//     ) {
//         super();
//     }

//     public ngOnInit() {
//         this.createTeamForm = this.fb.group({
//             'name': [null,
//                 Validators.minLength(this.minLen)
//             ],
//             users: this.fb.array([
//                 this.buildItem(),
//             ]),
//         });
//     }


//     buildItem() {
//         return new FormGroup({
//             email: new FormControl(null,
//                 Validators.compose([
//                     Validators.email,
//                     Validators.pattern("[^ @]*@[^ @]*"),
//                     Validators.minLength(this.minLen),
//                     Validators.maxLength(this.emailMaxLen)])
//             ),
//         })
//     }

//     createTeam(): void {
//         this.teamService.createTeam(this.createTeamForm.value).subscribe((data: Team) => {
//             this.router.navigate(['./team/teamlist']);
//             this.activeModal.close();
//         }, (err: HttpErrorResponse) => {
//             alert(err.error.err);
//         });
//     }

//     private getErrorMessage(field: AbstractControl, fieldName?: string): string {
        
//         const baseValidation = this.baseValidator(field);
        
//         if (baseValidation) {
//             return baseValidation;
//         }

//         const complexValidation = this.complexValidator(field);

//         if (complexValidation) {
//             return complexValidation;
//         }
//     }
// }
