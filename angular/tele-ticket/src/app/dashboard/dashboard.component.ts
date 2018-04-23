import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { UserInfo } from '../models/users/user.info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfo: UserInfo;
  constructor(private dashServise: DashboardService) { }
  ngOnInit() {
    this.dashServise.getUserInfo().subscribe((x: UserInfo) => {
      this.userInfo = x;
    }, (error) => {
      console.log(error);
    });
  }

}
