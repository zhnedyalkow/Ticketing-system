const Data = require('../data/generic.data');
const {
    Ticket,
    User,
    Label,
    Status,
} = require('../../db/models');

class TeamData extends Data {
    constructor() {
        super(Ticket, []);
    }

    getFullInfoForTicket(id) {
        const res = this.Model.findOne({
            where: {
                id: id,
            },
            include: [
            {
                attributes: {
                    exclude: ['password', 'role',
                    'createdAt', 'updatedAt', 'CompanyId'],
                },
                model: User,
                as: 'Creator',
            },
            {
                attributes: {
                    exclude: ['password', 'role',
                    'createdAt', 'updatedAt', 'CompanyId'],
                },
                model: User,
                as: 'AssignedUser',
            },
            {
                model: Label,
            },
            {
                model: Status,
            }],
        });

        return res;
    }
}

module.exports = TeamData;
