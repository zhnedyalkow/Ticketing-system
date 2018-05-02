const Data = require('../data/generic.data');
const {
    Team,
    User,
} = require('../../db/models');

class TeamData extends Data {
    constructor() {
        super(Team, []);
    }

    getTeamMember(obj) {
        return obj.getTeams();
    }

    getAllTeam(companyId) {
        const result = this.Model.findAll({
            where: {
                CompanyId: companyId,
            },
            include: [
                {
                    model: User,
                    as: 'TeamManager',
                },
            ],
        });

        return result;
    }

    getMyTeams(user) {
        const result = user.getTeams({
            include: [
                {
                    attributes: ['name'],
                    model: User,
                    as: 'TeamManager',
                },
            ],
        });

        return result;
        // const result = this.Model.findAll({
        //     where: {
        //         CompanyId: companyId,
        //     },
        //     include: [
        //         {
        //             model: User,
        //             as: 'TeamManager',
        //         },
        //     ],
        // });

        // return result;
    }
}

module.exports = TeamData;
