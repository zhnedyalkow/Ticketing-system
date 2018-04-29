import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../shared/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comments } from '../../../models/comments/comments';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  ticketInfo: object;
  comments: Comments[];
  snapshot: ActivatedRouteSnapshot;
  ticketId: number;
  addCommentForm: FormGroup;

  constructor(
    public ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.snapshot = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.ticketId = this.snapshot.params.ticketId;

    this.getTicketInfoById();
    this.getComments();

    this.addCommentForm = this.fb.group({
      'description': [null],
    });
  }

  getTicketInfoById() {
    this.ticketService.getTicketInfoById(this.ticketId).subscribe((data) => {
      this.ticketInfo = data;
    }, (err: HttpErrorResponse) => {
      alert(err.error.err);
    });
  }

  getComments() {
    this.ticketService.getComments(this.ticketId).subscribe((data: Comments[]) => {
      this.comments = data;
    });
  }

  addComment() {
    const newComment = {
      description: this.addCommentForm.value.description,
      ticketId: this.ticketId,
    }

    this.ticketService.addComment(newComment).subscribe((data : Comments) => {
      this.comments.unshift(data);
    }, (error : HttpErrorResponse) => {
      alert(error.error.err);
    });
  }
}
