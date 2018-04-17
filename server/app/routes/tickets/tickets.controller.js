class TicketsController {
    constructor(data) {
        this.data = data;
    }

    /**
     * @description Create ticket
     * @async
     * @param {Object} obj
     * receives a Error message in case invalid object
     * @return {String} Success message
     */

    async createTicket(obj) {
        return await this.data.tickets.create(obj);
    }

    /**
     * @description Finds all users with given team id
     * @async
     * @param {integer} id
     * receives thread id
     * @return {Array} Array with all users in that Team
     */

    async getAllMembersByTeamId(teamId) {
        const team = await this.data.teams.getById(teamId);
        const res = await team.getUsers();
        return res;
    }

     /**
     * @description Finds ticket info
     * @async
     * @param {integer} id
     * receives ticket id
     * @return {Object} Obj(Ticket)
     */

    async getTicketInfoById(ticketId) {
        const ticket = await this.data.tickets.getById(ticketId);
        return ticket;
    }

    async getTicketsUserByTicketId(ticketId) {
        const ticket = await this.data.tickets.getFullInfoForTicket(ticketId);
        return ticket;
    }

    async getAllTicketsByTeamId(teamId) {
        const tickets = await this.data.tickets.getById(teamId);
        return tickets;
    }

    async getUserByTicketId(ticketId) {
        const user = await this.data.user.getById(ticketId);
        return user;
    }
}

module.exports = TicketsController;
