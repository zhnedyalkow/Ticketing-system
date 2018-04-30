import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../shared/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comments } from '../../../models/comments/comments';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observer } from 'rxjs/Observer';
import { AuthService } from '../../../core/authentication/auth.service';
import { Ticket } from '../../../models/tickets/ticket';
import { Status } from '../../../models/tickets/status';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  ticketInfo: Ticket;
  comments: Comments[];
  snapshot: ActivatedRouteSnapshot;
  ticketId: number;
  addCommentForm: FormGroup;
  playLoad: {id: number, role: string};
  amIGM: boolean = false;
  amIAU: boolean = false;

  constructor(
    public ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth : AuthService,
  ) {
    this.snapshot = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.ticketId = this.snapshot.params.ticketId;
    this.playLoad = this.auth.tokenData();

    this.getTicketInfoById();
    this.getComments();

    this.addCommentForm = this.fb.group({
      'description': [null],
    });

    if (this.playLoad.role == 'admin') {
      this.amIGM = true;
    }

  }

  getTicketInfoById() {
    this.ticketService.getTicketInfoById(this.ticketId).subscribe((data : Ticket) => {
      this.ticketInfo = data;

      if (this.ticketInfo.Team.TeamManagerId == this.playLoad.id) {
        this.amIGM = true;
      }

      if (this.ticketInfo.AssignedUser.id == this.playLoad.id) {
        this.amIAU = true;
      }

      console.log(this.ticketInfo);
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

  changeStatus(status: string) {
    const statusData: Status = {
      name: status,
      tickedId: this.ticketId,
    }

    this.ticketService.changeStatus(statusData).subscribe((x: Status) => {
      console.log(x);
      this.ticketInfo.Status = x;
    }, (error: HttpErrorResponse) => {
      alert(error.error.err);
    });
  }
}
