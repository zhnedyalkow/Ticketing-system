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
        const allComments = await this.data.comments.getAllByCriteria({
            TicketId: ticketId,
        });
        return allComments;
    }

     /**
     * @description Create a new Comment
     * @async
     * @param {Object} obj
     * receives an object of the Comment
     * @return {Object} object of the created Comment
     */


    async createComment(obj) {
        const result = {
            message: '',
        };

        try {
            if (obj.id < 0) {
                throw new Error('Invalid id!');
            }

            if (obj.description.length < 1) {
                throw new Error(`Length of field
                must be more than one character!`);
            }

            if (obj.TicketId.length < 0) {
                throw new Error('The ticketId is missing!');
            }

            if (obj.UserId.length < 0) {
                throw new Error('The userId is missing!');
            }
        } catch (error) {
            throw error;
        }

        const newComment = await this.data.comments.create({
            description: obj.description,
            UserId: obj.UserId,
            TicketId: obj.TicketId,
        });

        if (!newComment) {
            result.message = 'Something went wrong!';
            return result;
        }

        result.message = 'Success!';
        return result;
    }
}


module.exports = CommentsController;
