import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../../dashboard/shared/services/team.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Team } from '../../models/teams/team';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})
export class ReusableModalComponent implements OnInit {

  @Input() teamName: string;
  public usersOfTeam: Team[];

  public email: AbstractControl;
  public addForm: FormGroup;
  public snapshot: ActivatedRouteSnapshot;
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
  ) {
    this.usersOfTeam = [];
  }

  ngOnInit() {
    // this.addForm = this.fb.group({
    //   users: this.fb.array([
    //     this.buildItem(),
    //   ]),
    // });
  }

//   public buildItem(): any {
//     return new FormGroup({
//       email: new FormControl(null,
//         Validators.compose([
//           Validators.required,
//           Validators.email,
//           Validators.minLength(8),
//           Validators.maxLength(50),
//           Validators.pattern(this.emailPattern),
//         ])
//       ),
//     });
//   }


//   public addUnit(): void {
//     const newMembers = {
//       teamName: this.teamName,
//       users: this.addForm.value.users,
//     }

//     this.teamService.addUnit(newMembers).subscribe((data: Team[]) => {

//       this.toastr.success(`User was successfully added!`);
//       this.usersOfTeam = data;
//       this.activeModal.close(this.usersOfTeam);
//       this.toastr.success(`User successfully added!`);
//     }, (err: HttpErrorResponse) => {
//       this.toastr.error(err.error.err);
//     });
//   }


}
