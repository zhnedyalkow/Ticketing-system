import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TeamboxComponent } from './teambox.component';
import { DebugElement, Input } from '@angular/core';
import { Team } from '../../../../models/teams/team';

class MockTeamBoxComponent {
    @Input() team: Team;
}

describe('TeamboxComponent', () => {
    let component: TeamboxComponent;
    let fixture: ComponentFixture<TeamboxComponent>;
    let li: HTMLElement;
    let p: HTMLElement;
    let h5: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TeamboxComponent],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamboxComponent);
        component = fixture.componentInstance;

        li = fixture.nativeElement.querySelector('li');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should have <li> with "users" fixture.debugElement.query(By.css)', () => {
    //     const team = 'Team1';
    //     const bannerDe: DebugElement = fixture.debugElement;
    //     const paragraphDe = bannerDe.query(By.css('users'));
    //     const li: HTMLElement = paragraphDe.nativeElement;
    //     expect(li.textContent).not.toEqual(null);
    // })

    // it('should display team name after detectChanges()', () => {
    //     fixture.detectChanges();
    //     expect(p.textContent).toContain(component.test);
    //     // expect(h5.textContent).toContain(component.team.name);
    //   });

});
