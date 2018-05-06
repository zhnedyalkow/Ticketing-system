// import {Observable, ReplaySubject} from 'rxjs';
// import { Ticket } from '../../../models/tickets/ticket';
// import { User } from '../../../models/users/user';


// export class MockTeamService {

//     public fakeResponse: any = null;

//     constructor() {
//         // spyOn(this, 'getAllTicketsOfTeam').and.callThrough;
//         // spyOn(this, 'getAllUsersOfTeam').and.callThrough;
//         spyOn(this, 'deleteTicket').and.callThrough;
//         spyOn(this, 'createTeam').and.callThrough;
//         spyOn(this, 'addUsersToTeam').and.callThrough;
//         spyOn(this, 'getTeamManager').and.callThrough;
//     }

//     // public getAllTicketsOfTeam(): Observable<Ticket[]> {
//     //     let subject = new ReplaySubject();
//     //     subject.next(this.fakeResponse);
//     //     return subject;
//     // }

//     // public getAllUsersOfTeam(): Observable<User[]> {
//     //     let subject = new ReplaySubject();
//     //     subject.next(this.fakeResponse);
//     //     return subject;
//     // }

//     public getTeamManager(): any {
//         let subject = new ReplaySubject();
//         subject.next(this.fakeResponse);
//         return subject;
//     }

//     public deleteTicket(): Observable<Object> {
//         let subject = new ReplaySubject();
//         subject.next(this.fakeResponse);
//         return subject;
//     }

//     public createTeam(): Observable<Object> {
//         let subject = new ReplaySubject();
//         subject.next(this.fakeResponse);
//         return subject;
//     }

//     public addUsersToTeam(): Observable<Object> {
//         let subject = new ReplaySubject();
//         subject.next(this.fakeResponse);
//         return subject;
//     }
// }