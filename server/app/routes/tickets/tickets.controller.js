// class TicketsController {
//     constructor(data) {
//         this.data = data;
//     }

//       /**
//      * @description Finds all tickets with given user id
//      * @async
//      * @param {integer} id
//      * receives thread id
//      * @return {Array} Array with all posts in that Thread
//      */

//     // async getAllTicketsByTeamMember(teamMember) {
//     //     const user = await this.data.teamMember.getById();
//     // }

//     async getAllTicketsByTeamId(teamId) {
//         const tickets = await this.data.tickets.getById(teamId);
//         return tickets;
//     }

//     async getUserByTicketId(ticketId) {
//         const user = await this.data.user.getById(ticketId);
//         return user;
//     }

    // getAllMembersByTeamId(teamId) {}
// }