import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamListComponent } from './team-list/team-list.component';

import { routes } from './team-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Router: TeamComponent', () => {
    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                TeamComponent,
                TeamListComponent,
                TeamPageComponent
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(TeamComponent);
        router.initialNavigation();
    });

    it('navigate to "teamlist" redirects you to /teamlist', () => {
        router.navigate(['teamlist']).then(() => {
            expect(location.path()).toBe('/teamlist');
        });
    });

    it('navigate to ":teamName" redirects you to /:teamName', () => {
        router.navigate([':teamName']).then(() => {
            expect(location.path()).toBe('/:teamName');
        });
    });

});




