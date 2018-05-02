import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
	ActivatedRouteSnapshot,
	Router,
	ActivatedRoute
} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/authentication/auth.service';
import { TicketService } from '../../../shared/services/ticket.service';

import { Comments } from '../../../../models/comments/comments';

@Component({
	selector: 'app-ticket-comments',
	templateUrl: './ticket-comments.component.html',
	styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit {

	public ticketId: number;
	public comments: Comments[];

	public addCommentForm: FormGroup;
	public snapshot: ActivatedRouteSnapshot;
	public genMinLengthMsg: string = "Min length should be more than 2 chars!";
    public genMaxLengthMsg: string = "Max length should be more than 50 chars!";

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,

		private auth: AuthService,
		private toastr: ToastrService,
		public ticketService: TicketService,
	) {
		this.snapshot = this.activatedRoute.snapshot;
	}

	public ngOnInit(): void {
		this.ticketId = this.snapshot.params.ticketId;

		this.addCommentForm = this.fb.group({
			'description': [null,
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(100),
                ])],
		});
		
		this.getComments();
	}
	public getComments(): void {
		this.ticketService.getComments(this.ticketId).subscribe((data: Comments[]) => {
			this.comments = data;
		});
	}
	public addComment(): void {
		const newComment = {
			description: this.addCommentForm.value.description,
			ticketId: this.ticketId,
		}

		this.ticketService.addComment(newComment).subscribe((data: Comments) => {
			this.toastr.success(`New comment added!`);
			this.comments.unshift(data);
		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.error.er);
		});

		this.addCommentForm.reset();
	}

}
