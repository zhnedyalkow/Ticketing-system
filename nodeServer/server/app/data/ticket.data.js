const Data = require('../data/generic.data');
const {
    Ticket,
    User,
    Label,
    Status,
    Team,
} = require('../../db/models');

class TeamData extends Data {
    constructor() {
        super(Ticket, []);
        this.fullTicketInfo = [
            {
                model: Status,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id'],
                },
            },
            {
                model: Label,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id'],
                },
            },
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
                attributes: ['name', 'TeamManagerId'],
                model: Team,
            },
        ];
    }

    getFullInfoForTicket(id) {
        const res = this.Model.findOne({
            attributes: ['title', 'description', 'dueDate', 'TeamId'],
            where: {
                id: id,
            },
            include: this.fullTicketInfo,
        });

        return res;
    }

    getAllTicketsInfo(teamId) {
        const result = this.Model.findAll({
            attributes: ['id', 'title', 'description', 'dueDate'],
            where: {
                TeamId: teamId,
            },
            include: this.fullTicketInfo,
        });

        return result;
    }
}

module.exports = TeamData;
