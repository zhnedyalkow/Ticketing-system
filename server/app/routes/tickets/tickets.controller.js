class TicketsController {
    constructor(data) {
        this.data = data;
    }

    /**
     * @description Create a new ticket
     * @async
     * @param {Object} obj
     * receives a Error message in case invalid object
     * @return {String} Success message
     */

    async createTicket(obj) {
        try {
            if (typeof obj === 'undefined') {
                throw new Error('The body is missing!');
            }

            if (obj.title.length < 0) {
                throw new Error('The title is missing!');
            }

            if (obj.description.length < 0) {
                throw new Error('The description is missing!');
            }

            if (obj.LabelId.length < 0) {
                throw new Error('The label is missing!');
            }

            if (obj.TeamId.length < 0) {
                throw new Error('Something went wrong!!');
            }

            if (obj.StatusId.length < 0) {
                throw new Error('Something went wrong!!');
            }

            if (obj.CreatorId.length < 0) {
                throw new Error('Something went wrong!!');
            }

            if (obj.AssignedUserId.length < 0) {
                throw new Error('You must to assign member to the ticket!');
            }

            const team = await this.data.teams.getById(obj.TeamId);
            const user = await this.data.users.getById(obj.AssignedUserId);
            const isExist = await team.hasUser(user);

            if (!isExist) {
                throw new Error('The user is not in the following team!');
            }
        } catch (error) {
            throw error;
        }

        return await this.data.tickets.create(obj);
    }

    /**
     * @description Finds all users with given team id
     * @async
     * @param {integer} id
     * receives thread id
     * @return {Array} Array with all users in that Team
     */

     /**
     * @description Finds ticket's info by provided id
     * @async
     * @param {integer} id
     * receives ticket id
     * @return {Object} Obj(Ticket)
     */

    async getTicketInfoById(ticketId) {
        const ticket = await this.data.tickets.getFullInfoForTicket(ticketId);
        return ticket;
    }

        /**
     * @description Finds Tickets by TeamId
     * @async
     * @param {string} teamId
     * receives Team id
     * @return {Object} objects with tickets info
     */

    async getAllTicketsByTeamId(teamId) {
        const tickets = await this.data.tickets.getById(teamId);
        return tickets;
    }

        /**
     * @description Finds Tickets by UserId
     * @async
     * @param {string} userId
     * receives User id
     * @return {Object} objects with tickets info
     */

    async getAllTicketsByUserId(userId) {
        const tickets = await this.data.tickets.getAllByCriteria({
            AssignedUserId: userId,
        });

        return tickets;
    }
}

module.exports = TicketsController;
