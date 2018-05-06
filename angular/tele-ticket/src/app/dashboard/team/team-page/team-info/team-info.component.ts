import { Component, OnInit, Input } from '@angular/core';

import { Ticket } from '../../../../models/tickets/ticket';

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
