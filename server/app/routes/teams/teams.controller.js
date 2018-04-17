class TeamsController {
    constructor(data) {
        this.data = data;
    }

    /**
     * @description Find a team
     * @async
     * @param {String} id
     * receives an string id of the Team
     * @return {Object} object of the found Team
     */

    async getTeamByTeamId(teamId) {
        const team = await this.data.teams.getById(teamId);
        return team;
    }

    /**
     * @description Creates a new Team
     * @async
     * @param {Object} obj
     * receives an object of the Team
     * @return {Object} object of the created Team
     */

    async createTeam(obj) {
        const result = {
            message: '',
        };

        try {
            if (obj.name.length < 1) {
                throw new Error(`Length of field
                must be more than one character`);
            }
        } catch (error) {
            throw error;
        }

        const newTeam = await this.data.teams.create({
            name: obj.name,
            companyId: 1, // check here
        });

        const allUsers = await Promise.all(obj.users.map((user) => {
            const res = this.data.users.getOneByCriteria({
                email: user.email,
            });

            return res;
        }));

        await newTeam.addUsers(allUsers);

        if (!newTeam) {
            result.message = 'Something went wrong';
            return result;
        }

        result.message = 'Success';
        return result;
    }

    /**
     * @description Finds Teams by Company name
     * @async
     * @param {string} companyName
     * receives Company name
     * @return {Object} objects with teams info
     */

    async getAllTeamsByCompanyId(companyId) {
        return await this.data.teams.getAllByCriteria({
            CompanyId: companyId,
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

    async getMembersByTeamId(teamId) {
        const usersId = await this.data.members.getAllByCriteria({
            teamId: teamId,
        });

        const users = await Promise.all(usersId.map((userId) => {
            const res = this.data.users.getOneByCriteria({
                id: userId.id,
            });

            return res;
        }));

        return users;
    }
}

module.exports = TeamsController;
