const {
    Status,
} = require('../../../db/models');

class TicketsController {
    constructor(data) {
        this.data = data;
    }

    async getMyTickets(user) {
        let tickets;

        try {
            tickets = await this.data.tickets.getMyTickets(user);

            tickets = tickets.filter((el) => {
                return el.dataValues.Team !== null;
            });
        } catch (error) {
            throw error;
        }

        return tickets;
    }

    async createTicket(obj, creator) {
        let ticket;
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

            if (obj.teamName.length < 0) {
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

            // Check whether the user is in the following team
            const team = await this.data.teams.getOneByCriteria({
                name: obj.teamName,
                CompanyId: creator.CompanyId,
            });

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

            // Check whether the creator is in the following team
            const teamHasCreator = await team.hasUser(creator);
            if (!teamHasCreator && creator.role !== 'admin') {
                throw new Error('You cannnot create ticket for this team!');
            }

            // Find or create the label
            const theLabel = await this.data.labels.findCreateFind({
                title: obj.label,
            });

            // Create new ticket
            ticket = await this.data.tickets.create({
                title: obj.title,
                description: obj.description,
                dueDate: fullDate,
                AssignedUserId: user.id,
                CreatorId: creator.id,
                TeamId: team.id,
                LabelId: theLabel[0].id,
                StatusId: 4,
            });

            // Create new notification
            const notification = await this.data.notifications.create({
                name: 'New ticket',
                UserId: user.id,
                description: 'You have been assigned to a ticket!',
            });

            // Add the new notification to the "newNotifications" table
            await this.data.newNotifications.create({
                UserId: obj.AssignedUserId,
                NotificationId: notification.id,
            });
        } catch (error) {
            throw error;
        }

        return ticket;
    }

    async getAllMyTickets(requester) {
        let tickets;

        try {
            tickets = await this.data.tickets.getAllByCriteria({
                AssignedUserId: requester.id,
            });

            if (!tickets) {
                throw new Error('You have not tickets!');
            }
        } catch (error) {
            throw error;
        }

        return tickets;
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
            if (!hasUser && requester.role !== 'admin') {
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
                CompanyId: user.CompanyId,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            const hasUser = await team.hasUser(user);
            if (!hasUser && user.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            result = await this.data.tickets.getAllTicketsInfo(team.id);
        } catch (error) {
            throw error;
        }

        return result;
    }

    async deleteTicket(ticketId, user) {
        try {
            const ticket = await this.data.tickets.getById(ticketId);

            if (!ticket) {
                throw new Error('This ticket is already deleted!');
            }

            const team = await ticket.getTeam();

            if (team.CompanyId !== user.CompanyId) {
                throw new Error('Something went wrong!');
            }

            const hasUser = await team.hasUser(user);

            if (team.TeamManagerId !== user.id && user.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            if (!hasUser && user.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            await ticket.destroy();
        } catch (error) {
            throw error;
        }

        return {
            success: true,
        };
    }

    async changeTicketStatus(statusName, ticketId, requester) {
        let status;

        try {
            // Chech whether status is valid
            if (!(statusName === 'closed' || statusName === 'completed' ||
                statusName === 'reopened')) {
                throw new Error('Something went wrong!');
            }

            // Get the ticket
            const ticket = await this.data.tickets.getById(ticketId);
            if (!ticket) {
                throw new Error('Something went wrong!');
            }

            const team = await ticket.getTeam();

            // Check whether the user is in company
            if (team.CompanyId !== requester.CompanyId) {
                throw new Error('Something went wrong!');
            }

            // Check whether the user is in team
            const hasUser = await team.hasUser(requester);
            if (!hasUser && requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            // Check whether the task is already closed
            if (ticket.StatusId === '2') {
                throw new Error('The task is already closed!');
            }

            // Check whether you are TeamManager or Admin
            if ((statusName === 'closed' || statusName === 'reopened')) {
                if (team.TeamManagerId !== requester.id &&
                    requester.role !== 'admin'
                ) {
                    throw new Error('You have not permission to do that!');
                }
            }

            // Check whether you are Assigned User
            if (statusName === 'complated') {
                if (ticket.AssignedUserId !== requester.id) {
                    throw new Error('You have not permission to do that!');
                }
            }

            // Get the status
            status = await this.data.statuses.getOneByCriteria({
                name: statusName,
            });

            if (!status) {
                throw new Error('There is no such a status!');
            }

            ticket.StatusId = status.id;
            await ticket.save();

            const newNotifications = (id) => {
                return {
                    name: 'Status change!',
                    UserId: id,
                    description: `The status of
                    the ticket "${ticket.title}" from
                    team "${team.name}" has been changed to "${status.name}"`,
                };
            };

            // Send Notification
            if (statusName === 'complated') {
                await this.data
                    .notifications.create(
                        newNotifications(team.TeamManagerId)
                    );
            } else {
                await this.data.notifications.create(
                    newNotifications(ticket.AssignedUserId)
                );
            }
        } catch (error) {
            throw error;
        }

        return status;
    }
}

module.exports = TicketsController;
