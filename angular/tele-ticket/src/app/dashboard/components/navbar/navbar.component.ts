import { OnInit, Component, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { DashboardService } from "../../shared/services/dashboard.service";
import { AuthService } from "../../../core/authentication/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateTeamComponent } from "../create-team/create-team.component";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() userInfo$: Observable<Object>
  public isMenuOpen: boolean = false;
  public closeResult: string;

  constructor(
    private router: Router,
    private dashService: DashboardService,
    private auth: AuthService,

    private modalService: NgbModal,

  ) { }

  public ngOnInit(): void {
  }

  public openMenu():void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public logoutUser(): void {
    this.auth.logout();
    this.router.navigate(['./home']);
  }

  public openCreateTeam(): void {
    this.modalService.open(CreateTeamComponent);
  }
  public openCreateIssue(): void {
    this.modalService.open(CreateTicketComponent);
  }

}
