// import { Location } from '@angular/common';
// import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';

// import { TeamComponent } from './team.component';
// import { TeamPageComponent } from './team-page/team-page.component';
// import { TeamListComponent } from './team-list/team-list.component';

// import { routes } from './team-routing.module';

// describe('Router: TeamComponent', () => {
//     let location: Location;
//     let router: Router;
//     let fixture;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule.withRoutes(routes)],
//             declarations: [
//                 TeamComponent,
//                 TeamListComponent,
//                 TeamPageComponent
//             ]
//         })
//     }));

//     router = TestBed.get(Router);
//     location = TestBed.get(Location);

//     fixture = TestBed.createComponent(TeamComponent);
//     router.initialNavigation();

//     it('should click link', () => {
//         let fixture = TestBed.createComponent(TeamComponent);
//         fixture.detectChanges();
//         let component: TeamComponent = fixture.componentInstance;
//         component.clickLink('home');
//         expect(mockRouter.navigate).toHaveBeenCallWith(['/home']);
//     });

//     // it('fakeAsync works', fakeAsync(() => {
//     //     let promise = new Promise((resolve) => {
//     //         setTimeout(resolve, 10)
//     //     });

//     //     let done = false;
//     //     promise.then(() => done = true);
//     //     tick(50);
//     //     expect(done).toBeTruthy();
//     // }));

//     // it('navigate to " " redirects you to /team', fakeAsync(() => {
//     //     router.navigate([''])
//     //     .then(() => {
//     //         expect(router.url).toBe('/team');
//     //     }, () => {
//     //         fail('Failed to open page');
//     //     });
//     // }));

//     // it('navigate to " " redirects you to /team', fakeAsync(() => {
//     //     router.navigate(['']);
//     //     tick(50);
//     //     expect(location.path()).toBe('/team');
//     // }));

//     // it(`navigate to 'teamlist' takes you to /teamlist`, fakeAsync(() => {
//     //     router.navigate(['/teamlist']);
//     //     tick(50);
//     //     expect(location.path()).toBe('/teamlist');
//     // }))
// });



