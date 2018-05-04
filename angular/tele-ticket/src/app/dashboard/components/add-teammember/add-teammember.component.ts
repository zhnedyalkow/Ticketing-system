import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/users/user';
import { UserInfo } from '../../../models/users/user.info';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamService } from '../../shared/services/team.service';
import { Team } from '../../../models/teams/team';

@Component({
	selector: 'app-add-teammember',
	templateUrl: './add-teammember.component.html',
	styleUrls: ['./add-teammember.component.scss']
})
export class AddTeammemberComponent implements OnInit {

	@Input() teamName: string;

	public usersOfTeam: Team[];

	public email: AbstractControl;
	public addTeamMemberForm: FormGroup;
	public snapshot: ActivatedRouteSnapshot;
	public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

	constructor(
		private fb: FormBuilder,
		private teamService: TeamService,
		private modalService: NgbModal,
		private toastr: ToastrService,
		public activeModal: NgbActiveModal,
	) { 
		this.usersOfTeam = [];
	}

	public ngOnInit() {

		this.addTeamMemberForm = this.fb.group({
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
		});
    }
    

	public addUsersToTeam(): void {
		const newMembers = {
			teamName: this.teamName,
			users: this.addTeamMemberForm.value.users,
		}
        debugger;
        this.teamService.addUsersToTeam(newMembers).subscribe((data: Team[]) => {
		
			this.toastr.success(`User was successfully added!`);
			this.usersOfTeam = data;
			this.activeModal.close(this.usersOfTeam);
            this.toastr.success(`User successfully added!`);
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }

	// public addUnit(): void {
	// 	const newMembers = {
	// 	  teamName: this.teamName,
	// 	  users: this.addForm.value.users,
	// 	}
	
	// 	this.teamService.addUnit(newMembers).subscribe((data: Team[]) => {
	
	// 	  this.toastr.success(`User was successfully added!`);
	// 	  this.usersOfTeam = data;
	// 	  this.activeModal.close(this.usersOfTeam);
	// 	  this.toastr.success(`User successfully added!`);
	// 	}, (err: HttpErrorResponse) => {
	// 	  this.toastr.error(err.error.err);
	// 	});
	//   }

}
