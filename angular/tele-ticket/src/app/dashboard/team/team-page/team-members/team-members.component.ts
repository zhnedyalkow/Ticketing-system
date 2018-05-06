import { Component, OnInit, Input } from '@angular/core';
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
