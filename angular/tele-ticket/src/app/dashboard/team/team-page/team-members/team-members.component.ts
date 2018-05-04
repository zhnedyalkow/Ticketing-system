import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../../shared/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../models/users/user';
import { Ticket } from '../../../../models/tickets/ticket';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {


	@Input() teamName: string;

	public usersOfTeam: User[]

	constructor(
		public teamService: TeamService,
		private toastr: ToastrService,
	) { }

	public ngOnInit(): void {
		this.getAllUsersOfTeam();
	}

	public getAllUsersOfTeam(): void {
		this.teamService.getAllUsersOfTeam(this.teamName).subscribe((x) => {
			this.usersOfTeam = x;
		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.error.err);
		});
	}


}
