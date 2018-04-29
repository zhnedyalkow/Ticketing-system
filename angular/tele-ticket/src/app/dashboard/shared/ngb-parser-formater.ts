import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export abstract class NgbDateParserFormatter { 
    abstract parse(value: string): NgbDate; 
    abstract format(date: NgbDate): string; 
  } 