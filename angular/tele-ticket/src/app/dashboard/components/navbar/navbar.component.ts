import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../shared/services/dashboard.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateTeamComponent } from './../create-team/create-team.component';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() userInfo$: Observable<Object>

  public closeResult: string;

  constructor(
    private router: Router,
    private dashService: DashboardService,
    private auth: AuthService,

    private modalService: NgbModal

  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.auth.logout();
    this.router.navigate(['./']);
  }

  openCreateTeam() {
    this.modalService.open(CreateTeamComponent);
  }

  openCreateIssue() {
    this.modalService.open(CreateTicketComponent);
  }

}
