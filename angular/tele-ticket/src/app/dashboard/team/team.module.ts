import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';

import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamComponent } from './team.component';
import { TeamboxComponent } from './team-list/teambox/teambox.component';
import { TeamInfoComponent } from './team-page/team-info/team-info.component';
import { BtnsComponent } from './team-page/btns/btns.component';
import { TeamMembersComponent } from './team-page/team-members/team-members.component';

@NgModule({
    declarations: [
        TeamListComponent,
        TeamPageComponent,
        TeamboxComponent,
        TeamComponent,
        TeamInfoComponent,
        BtnsComponent,
        TeamMembersComponent,
    ],
    imports: [
        CommonModule,
        TeamRoutingModule
    ],
    providers: [],
})
export class TeamModule { }
