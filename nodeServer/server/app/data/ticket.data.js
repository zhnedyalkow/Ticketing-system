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

    getAllTicketsInfo(teamId) {
        const result = this.Model.findAll({
            attributes: ['title', 'description', 'dueDate'],
            where: {
                TeamId: teamId,
            },
            include: [
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
            ],
        });

        return result;
    }
}

module.exports = TeamData;
