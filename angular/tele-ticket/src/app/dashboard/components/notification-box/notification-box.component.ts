import { Component, OnInit, Input } from '@angular/core';
import { Notification } from "../../../models/notifications/notification";

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

  @Input() notification: Notification;
  constructor() { }

  ngOnInit() {
  }

}
