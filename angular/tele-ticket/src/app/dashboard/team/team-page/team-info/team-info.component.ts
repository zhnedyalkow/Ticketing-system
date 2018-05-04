import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { TeamService } from '../../../shared/services/team.service';

import { Ticket } from '../../../../models/tickets/ticket';
import { User } from '../../../../models/users/user';

@Component({
	selector: 'app-team-info',
	templateUrl: './team-info.component.html',
	styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

	@Input() teamName: string;

	public usersOfTeam: User[]
	public myTickets: Ticket[];

	constructor(
		public teamService: TeamService,
		private toastr: ToastrService,
	) { }

	public ngOnInit(): void {
		this.getAllTicketsByTeam();
	}

	public getAllTicketsByTeam(): void {
		this.teamService.getAllTicketsOfTeam(this.teamName).subscribe((x) => {
			this.myTickets = x;
		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.error.err);
		});
	}
}
