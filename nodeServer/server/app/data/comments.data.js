const Data = require('../data/generic.data');
const {
    Comments,
    User,
} = require('../../db/models');

class CommentsData extends Data {
    constructor() {
        super(Comments, []);
    }

    getComments(ticketId) {
        const result = this.Model.findAll({
            attributes: ['description', 'createdAt'],
            where: {
                TicketId: ticketId,
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'avatar'],
                },
            ],
        });

        return result;
    }
}

module.exports = CommentsData;
