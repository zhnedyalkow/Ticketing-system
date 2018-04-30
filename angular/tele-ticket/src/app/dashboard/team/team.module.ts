import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';

import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamComponent } from './team.component';
import { TeamboxComponent } from './team-list/teambox/teambox.component';

@NgModule({
    declarations: [
        TeamListComponent,
        TeamPageComponent,
        TeamboxComponent,
        TeamComponent
    ],
    imports: [
        CommonModule,
        TeamRoutingModule
    ],
    providers: [

    ],
})
export class TeamModule { }
