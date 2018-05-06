import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddTeammemberComponent } from '../../../components/add-teammember/add-teammember.component';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';
import { TeamService } from '../../../shared/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../../../../models/tickets/ticket';
import { User } from '../../../../models/users/user';
import { PlayLoad } from '../../../../models/users/playLoad';
import { UserInfo } from '../../../../models/users/user.info';

@Component({
    selector: 'app-btns',
    templateUrl: './btns.component.html',
    styleUrls: ['./btns.component.scss']
})
export class BtnsComponent implements OnInit {

    @Input() teamName: string;
    @Input() usersOfTeam: UserInfo[];

    constructor(
        private router: Router,
        private auth: AuthService,
        public teamService: TeamService,
        private toastr: ToastrService,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
    }

    public openAddTeammember(): void {
        const popup = this.modalService.open(AddTeammemberComponent);
        popup.componentInstance.teamName = this.teamName;
        popup.result.then((data: UserInfo[]) => {
            data.forEach((newUser: UserInfo) => {
                this.usersOfTeam.push(newUser);
            });
        });
    }

    public deleteTeam(): void {
        const teamForDelete = {
            teamName: this.teamName,
        };

        this.teamService.deleteTicket(teamForDelete)
            .subscribe((data: {
                success: string,
            }) => {
                this.toastr.success(`Successfully deleted team!`);
                this.router.navigate(['./team']);

            }, (err: HttpErrorResponse) => {
                this.toastr.error(err.error.err)
            })
    }
}
