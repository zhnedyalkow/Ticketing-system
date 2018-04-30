import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()
export class DatepickerValidationService {

    constructor() { }

    public isDate(c: AbstractControl): { [key: string]: boolean } | null {
        console.log(`object`);

        if (c.pristine) {
            return null;
        }

        if ((c.value !== undefined && c.value !== '' && c.value !== null)) {
            let month = null;
            let year = null;
            let day = null;

            let currentTaxYear = Number(new Date().getFullYear());

            if (c.value !== 0) {
                month = c.value.month;
                day = c.value.day;
                year = c.value.year;
            }

            if (isNaN(month) || isNaN(day) || isNaN(year)) {
                return {
                    'dateInvalid': true
                };
            }
            month = Number(month);
            day = Number(day);
            year = Number(year);

            if (isNaN(month) || isNaN(day) || isNaN(year)) {
                return {
                    'dateInvalid': true
                };
            }
            month = Number(month);
            day = Number(day);
            year = Number(year);

            if (month < 1 || month > 12) {
                return {
                    'dateInvalid': true
                }; 
            }

            if (day < 1 || day > 31) {
                return {
                    'dateInvalid': true
                };
            }
            if ((month === 4 || month === 6 || month === 9 ||
                month === 11) && day === 31) {
                return {
                    'dateInvalid': true
                };
            }
            if (month == 2) { // check for february 29th
                var isleap = (year % 4 === 0 &&
                    (year % 100 !== 0 || year % 400 === 0));
                if (day > 29 || (day === 29 && !isleap)) {
                    return {
                        'dateInvalid': true
                    };
                }
            }

            if (year !== currentTaxYear) {
                return {
                    'dateInvalid': true
                };
            }
        }
        return null;
    }
}