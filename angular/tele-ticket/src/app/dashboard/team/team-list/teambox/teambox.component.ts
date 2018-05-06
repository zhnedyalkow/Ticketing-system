import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../../models/teams/team';

@Component({
    selector: 'app-teambox',
    templateUrl: './teambox.component.html',
    styleUrls: ['./teambox.component.scss']
})
export class TeamboxComponent implements OnInit {

    @Input() team: Team;

    constructor() { }

    ngOnInit() {
    }
}
