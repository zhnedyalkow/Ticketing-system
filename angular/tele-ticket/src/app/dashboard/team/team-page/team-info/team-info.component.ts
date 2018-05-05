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
	@Input() myTickets: Ticket[];

	constructor() { }

	public ngOnInit(): void {}
}
