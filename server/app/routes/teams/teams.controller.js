class TeamsController {
    constructor(data) {
        this.data = data;
    }

    /**
     * @description Creates a new Team
     * @async
     * @param {Object} obj
     * receives an object of the Team
     * @return {Object} object of the created Team
     */

    async createTeam(obj) {
        const createdTeam = this.data.teams.create(obj);
        return createdTeam;
    }

    /**
     * @description Finds Teams by Company name
     * @async
     * @param {string} companyName
     * receives Company name
     * @return {Object} objects with teams info
     */

    async getAllTeamsByCompanyName(companyName) {
        return this.data.teams.getAllByCriteria({
            companyName,
        });
    }

    /**
     * @description Finds all teams with given user id
     * @async
     * @param {integer} id
     * receives thread id
     * @return {Array} Array with all posts in that Thread
     */

    async getMyTeamsByUserId(userId) {
        const user = await this.data.users.getById(userId);
        const teams = await this.data.teams.getTeamMember(user);

        return teams;
    }
}

module.exports = TeamsController;
