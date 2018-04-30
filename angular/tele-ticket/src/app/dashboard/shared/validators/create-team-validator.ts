import { OnInit } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { ICreateTeam } from "../interfaces/create-team.interface";

export class ValidateInputFormFields implements ICreateTeam, OnInit {

    public createTeamForm: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;

    public emailMaxLen: number;
    public nameMaxLen: number;
    public minLen: 8;

    constructor() { }
    ngOnInit(): void { }

    public baseValidator(field: AbstractControl): string {
        if (field.hasError('required')) {
            return 'The field is required!'
        } else if (field.hasError('email')) {
            return 'Invalid email!';
        }
        return null;
    }

    public complexValidator(field: AbstractControl, fieldName?: string): any {
        if (field.errors) {
            if (field.errors.minLen) {
                const fieldLen = field.errors.minLen.requiredLength;

                return `Your ${fieldName} must be at least ${fieldLen} symbols`;
            }
        }
        return null;
    }

}