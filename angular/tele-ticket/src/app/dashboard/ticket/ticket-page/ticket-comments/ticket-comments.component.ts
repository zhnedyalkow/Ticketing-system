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

import { Comment } from '../../../../models/comments/comment';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { UserInfo } from '../../../../models/users/user.info';

@Component({
    selector: 'app-ticket-comments',
    templateUrl: './ticket-comments.component.html',
    styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit {

    public ticketId: number;
    public comments: Comment[];
    public userInfo: UserInfo;

    public addCommentForm: FormGroup;
    public snapshot: ActivatedRouteSnapshot;
    public genMinLengthMsg: string = "Min length should be more than 2 chars!";
    public genErr: string = "Please fill the form if you want to leave a comment";

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,

        private toastr: ToastrService,
        private ticketService: TicketService,
        private dashService: DashboardService,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    ngOnInit(): void {
        this.ticketId = this.snapshot.params.ticketId;

        this.getUserInfo();
        this.buildAddCommentForm();
        this.getComments();
    }

    public getUserInfo(): void {
        this.dashService.getUserInfo().subscribe((user) => {
            this.userInfo = user;
        });
    }

    public buildAddCommentForm(): void {
        this.addCommentForm = this.fb.group({
            'description': [null,
                Validators.compose([
                    Validators.minLength(2),
                    Validators.maxLength(100),
                ])],
        });
    }

    public getComments(): void {
        this.ticketService.getComments(this.ticketId).subscribe((data: Comment[]) => {
            this.comments = data;
        });
    }
    public addComment(): void {
        const newComment = {
            description: this.addCommentForm.value.description,
            ticketId: this.ticketId,
        }

        this.ticketService.addComment(newComment).subscribe((data: Comment) => {
            this.toastr.success(`New comment added!`);
            this.comments.unshift(data);
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.er);
        });

        this.addCommentForm.reset();
    }
}
