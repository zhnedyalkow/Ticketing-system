import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from '../../../shared/services/ticket.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../../../../models/tickets/ticket';
import { Status } from '../../../../models/tickets/status';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-ticket-status-btns',
	templateUrl: './ticket-status-btns.component.html',
	styleUrls: ['./ticket-status-btns.component.scss']
})
export class TicketStatusBtnsComponent implements OnInit {

	@Input() ticketInfo: Ticket;
	public ticketId: number;
	public amIGM: boolean = false;
	public amIAU: boolean = false;
	public snapshot: ActivatedRouteSnapshot;
	public playLoad: { id: number, role: string };

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private auth: AuthService,
		private toastr: ToastrService,
		public ticketService: TicketService,
		private activatedRoute: ActivatedRoute,
	) {
		this.snapshot = this.activatedRoute.snapshot;
	}

	public ngOnInit(): void {
		this.ticketId = this.snapshot.params.ticketId;
		this.playLoad = this.auth.tokenData();

		if (this.playLoad.role == 'admin') {
			this.amIGM = true;
		}
	}

	public changeStatus(status: string): void {
		const statusData: Status = {
			name: status,
			tickedId: this.ticketId,
		}

		this.ticketService.changeStatus(statusData).subscribe((x: Status) => {
			this.ticketInfo.Status = x;
			this.toastr.success(`Changed status: ${x}!`);
		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.error.er);
		});
	}

	public deleteTicket(): void {
		const ticketForDelete = {
			ticketId: this.ticketId,
		};

		this.ticketService.deleteTicket(ticketForDelete)
			.subscribe((data: {
				success: string,
			}) => {
				this.toastr.success(`Successfully deleted ticket!`);
				this.router.navigate(['./ticket']);
			}, (err: HttpErrorResponse) => {
				if (err.status === 302) {
					this.toastr.error(err.error.err)
				}
			})
	}

	public getTicketInfoById(): void {
		this.ticketService.getTicketInfoById(this.ticketId).subscribe((data: Ticket) => {
			this.ticketInfo = data;

			if (this.ticketInfo.Team.TeamManagerId == this.playLoad.id) {
				this.amIGM = true;
			}

			if (this.ticketInfo.AssignedUser.id == this.playLoad.id) {
				this.amIAU = true;
			}

		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.error.er);
		});
	}
}
