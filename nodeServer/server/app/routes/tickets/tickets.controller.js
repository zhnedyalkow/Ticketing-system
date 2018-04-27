const {
    Status,
} = require('../../../db/models');

class TicketsController {
    constructor(data) {
        this.data = data;
    }

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

    async getTicketInfoById(ticketId) {
        const ticket = await this.data.tickets.getFullInfoForTicket(ticketId);
        return ticket;
    }

    async getAllTicketsByTeam(teamName, user) {
        let result;

        try {
            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            const hasUser = await team.hasUser(user);
            if (!hasUser) {
                throw new Error('Something went wrong!');
            }

            result = await this.data.tickets.getAllTicketsInfo(team.id);
        } catch (error) {
            throw error;
        }

        return result;
    }

    async getAllTicketsByUserId(userId) {
        const tickets = await this.data.tickets.getAllByCriteria({
            AssignedUserId: userId,
        });

        return tickets;
    }
}

module.exports = TicketsController;
