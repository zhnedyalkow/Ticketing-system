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
        // const obj = {
        //     title: '',
        //     description: '',
        //     dueDate: '',
        //     LabelId: '',
        //     TeamId: '',
        //     StatusId: '',
        //     CreatorId: '',
        //     AssignedUserId: '',
        // };

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

            // Check weather the user is in the following team
            const team = await this.data.teams.getById(obj.TeamId);
            const user = await this.data.users.getById(obj.AssignedUserId);
            const isExist = await team.hasUser(user);

            if (!isExist) {
                throw new Error('The user is not in the following team!');
            }
        } catch (error) {
            throw error;
        }

        // Create new ticket
        await this.data.tickets.create(obj);

        // Create new notification
        const notification = await this.data.notifications.create({
            name: 'New ticket',
            UserId: obj.AssignedUserId,
            description: 'You have been assigned to a ticket!',
        });

        // Add the new notification to the "newNotifications" tables
        await this.data.newNotifications.create({
            UserId: obj.AssignedUserId,
            NotificationId: notification.id,
        });

        return { message: 'Success' };
    }

    /**
     * @description Finds all users with given team id
     * @async
     * @param {integer} id
     * receives thread id
     * @return {Array} Array with all users in that Team
     */

     /**
     * @description Finds ticket info
     * @async
     * @param {integer} id
     * receives ticket id
     * @return {Object} Obj(Ticket)
     */

    async getTicketInfoById(ticketId) {
        const ticket = await this.data.tickets.getFullInfoForTicket(ticketId);
        return ticket;
    }

    async getAllTicketsByTeamId(teamId) {
        const tickets = await this.data.tickets.getById(teamId);
        return tickets;
    }

    async getAllTicketsByUserId(userId) {
        const tickets = await this.data.tickets.getAllByCriteria({
            AssignedUserId: userId,
        });

        return tickets;
    }
}

module.exports = TicketsController;
