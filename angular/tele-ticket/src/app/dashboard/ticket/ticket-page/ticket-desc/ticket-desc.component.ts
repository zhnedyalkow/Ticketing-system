import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ticket-desc',
  templateUrl: './ticket-desc.component.html',
  styleUrls: ['./ticket-desc.component.scss']
})
export class TicketDescComponent implements OnInit {

  @Input() ticketInfo: object;
  @Input() amIGM: boolean;
  @Input() amIAU: boolean;

  constructor() { }

  ngOnInit() {

  }
}
