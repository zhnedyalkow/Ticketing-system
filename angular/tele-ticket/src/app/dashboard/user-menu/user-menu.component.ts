import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from '../../models/users/user.info';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() userInfo: UserInfo;
  constructor() { }

  ngOnInit() {

  }

}
