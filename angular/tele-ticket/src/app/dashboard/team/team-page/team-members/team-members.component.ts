import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../../shared/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../models/users/user';
import { Ticket } from '../../../../models/tickets/ticket';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfo } from '../../../../models/users/user.info';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {
	@Input() usersOfTeam: UserInfo[];

	constructor() { }

	public ngOnInit(): void {
	}
}
