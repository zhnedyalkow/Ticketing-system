import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-desc',
  templateUrl: './ticket-desc.component.html',
  styleUrls: ['./ticket-desc.component.scss']
})
export class TicketDescComponent implements OnInit {

  @Input() ticketInfo : object;
  
  constructor() { }

  ngOnInit() {
  }

}
