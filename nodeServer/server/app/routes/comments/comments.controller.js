class CommentsController {
    constructor(data) {
        this.data = data;
    }

    async getAllCommentsByTicketId(ticketId, requester) {
        let allComments;

        try {
            const ticket = await this.data.tickets.getOneByCriteria({
                id: ticketId,
            });

            if (!ticket) {
                throw new Error('Something went wrong!');
            }

            const team = await ticket.getTeam();
            const hasUser = await team.hasUser(requester);
            if (!hasUser && requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            allComments = await this.data.comments.getComments(ticketId);
        } catch (error) {
            throw error;
        }

        return allComments;
    }

    async createComment(obj, creator) {
        try {
            if (typeof obj.description === 'undefined' ||
                obj.description.length < 1
            ) {
                throw new Error(`Length of field
                must be more than one character!`);
            }

            if (typeof obj.ticketId === 'undefined' ||
                obj.ticketId.length < 0
            ) {
                throw new Error('The ticketId is missing!');
            }

            // Check whether the cretor has permission
            // to create comment for this ticket
            const ticket = await this.data.tickets.getOneByCriteria({
                id: obj.ticketId,
            });

            const team = await ticket.getTeam();
            if (team.CompanyId !== creator.CompanyId) {
                throw new Error('Something went wrong!');
            }

            const teamHasUser = await team.hasUser(creator);
            if (!teamHasUser && creator.role !== 'admin') {
                throw new Error(`You have not permission
                    to add comments to this ticket!`);
            }
        } catch (error) {
            throw error;
        }

        const newComment = await this.data.comments.create({
            description: obj.description,
            UserId: creator.id,
            TicketId: obj.ticketId,
        });

        newComment.dataValues.User = await newComment.getUser({
            attributes: ['name', 'email', 'id', 'avatar'],
        });

        if (!newComment) {
            throw new Error('Something went wrong!');
        }

        return newComment;
    }
}


module.exports = CommentsController;
