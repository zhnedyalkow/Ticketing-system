import { FormGroup, AbstractControl } from "@angular/forms";

export interface ICreateTeam {
    createTeamForm: FormGroup;
    name: AbstractControl
    email: AbstractControl;

    emailMaxLen: number;
    nameMaxLen: number;
    minLen: number;
}