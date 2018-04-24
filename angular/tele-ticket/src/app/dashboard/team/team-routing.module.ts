import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';

const routes: Routes = [
    // {
    //     path: 'team', component: TeamComponent, children: [
    //         { path: 'teamlist', component: TeamListComponent},
    //         { path: 'team-page', component: TeamPageComponent },
    //     ]
    // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
