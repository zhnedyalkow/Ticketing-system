const Data = require('../data/generic.data');
const {
    Team,
} = require('../../db/models');

class TeamData extends Data {
    constructor() {
        super(Team, []);
    }
    getTeamMember(obj) {
        return obj.getTeams();
    }
}

module.exports = TeamData;
