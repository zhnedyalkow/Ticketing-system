const {
    Status,
} = require('../../../db/models');

class TicketsController {
    constructor(data) {
        this.data = data;
    }

    async createTicket(obj, creator) {
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

            if (obj.label.length < 0) {
                throw new Error('The label is missing!');
            }

            if (obj.teamId.length < 0) {
                throw new Error('Something went wrong!!');
            }

            if (obj.assignedUser.length < 0) {
                throw new Error('You must to assign member to the ticket!');
            }

            const fullDate = Object.keys(obj.dueDate)
                .map((x) => obj.dueDate[x]).join('/');

            if (new Date(fullDate).toDateString() === 'Invalid Date') {
                throw new Error('The following date is invalid!');
            }

            // Check weather the user is in the following team
            const team = await this.data.teams.getById(obj.teamId);

            if (!team) {
                throw new Error('There is now such a team!');
            }

            const user = await this.data.users.getOneByCriteria({
                email: obj.assignedUser,
            });

            if (!user) {
                throw new Error(`There is
                now user with email ${obj.assignedUser}`);
            }
            const teamHasUser = await team.hasUser(user);

            if (!teamHasUser) {
                throw new Error('The user is not belong the following team!');
            }

            // Check weather the creator is in the following team
            const teamHasCreator = await team.hasUser(creator);
            if (!teamHasCreator) {
                throw new Error('You cannnot create ticket for this team!');
            }

            // Find or create the label
            const theLabel = await this.data.labels.findCreateFind({
                title: obj.label,
            });

            // Create new ticket
            await this.data.tickets.create({
                title: obj.title,
                description: obj.description,
                dueDate: fullDate,
                AssignedUserId: user.id,
                CreatorId: creator.id,
                TeamId: obj.teamId,
                LabelId: theLabel[0].id,
                StatusId: 4,
            });
        } catch (error) {
            throw error;
        }

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

    async getTicketInfoById(ticketId, requester) {
        let ticket;

        try {
            ticket = await this.data
                .tickets.getFullInfoForTicket(ticketId);
            if (!ticket) {
                throw new Error('There is now such a ticket!');
            }

            const team = await ticket.getTeam();
            if (team.CompanyId !== requester.CompanyId) {
                throw new Error('Something went wrong!');
            }

            const hasUser = await team.hasUser(requester);
            if (!hasUser) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            throw error;
        }

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
