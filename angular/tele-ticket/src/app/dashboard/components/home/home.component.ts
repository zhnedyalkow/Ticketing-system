import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/services/home.service';
import { Notification } from "../../../models/notifications/notification";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public notifications: Notification[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getMyNotifications();
  }

  public getMyNotifications():void {
    this.homeService.getMyNotifications().subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
      });
  }
}
