class CommentsController {
    constructor(data) {
        this.data = data;
    }

    /**
     * @description Finds Comments by TicketId
     * @async
     * @param {string} ticketId
     * receives Ticket id
     * @return {Object} objects with comments info
     */

    async getAllCommentsByTicketId(ticketId) {
        const allComments = await this.data.comments.getComments(ticketId);

        return allComments;
    }

     /**
     * @description Create a new Comment
     * @async
     * @param {Object} obj
     * receives an object of the Comment
     * @return {Object} object of the created Comment
     */


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

            // Check whater the cretor has permission
            // to create comment for this ticket
            const ticket = await this.data.tickets.getOneByCriteria({
                id: obj.ticketId,
            });

            const team = await ticket.getTeam();
            const teamHasUser = await team.hasUser(creator);

            if (!teamHasUser) {
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
            attributes: ['name', 'email', 'id'],
        });

        if (!newComment) {
            throw new Error('Something went wrong!');
        }

        return newComment;
    }
}


module.exports = CommentsController;
