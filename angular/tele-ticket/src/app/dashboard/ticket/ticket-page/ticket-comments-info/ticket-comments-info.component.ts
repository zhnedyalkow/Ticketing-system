import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-comments-info',
  templateUrl: './ticket-comments-info.component.html',
  styleUrls: ['./ticket-comments-info.component.scss']
})
export class TicketCommentsInfoComponent implements OnInit {

    @Input() comment: Comment;
    
  constructor() { }

  ngOnInit() {
  }

}
