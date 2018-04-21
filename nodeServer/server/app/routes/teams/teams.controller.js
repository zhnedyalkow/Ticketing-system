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

        // Get all user by following email
        // *TODO => CHECK WEATHER EMAIL IS INVALID
        const allUsers = await Promise.all(obj.users.map(async (user) => {
            const res = await this.data.users.getOneByCriteria({
                email: user.email,
            });

            if (!res) {
                throw new Error(`User with following
                email => ${user.email}, doesn't exist!`);
            }

            return res;
        }));

        const newTeam = await this.data.teams.create({
            name: obj.name,
            CompanyId: 1, // check here TODO
        });

        // Add users to the teamMembers table
        await newTeam.addUsers(allUsers);

        // Create new notification to all assigned users
        await Promise.all(allUsers.map(async (user) => {
            const notification = await this.data.notifications.create({
                name: 'New Team',
                UserId: user.id,
                description: `You have been 
                assigned to a new team "${obj.name}"!`,
            });

            return await this.data.newNotifications.create({
                UserId: user.id,
                NotificationId: notification.id,
            });
        }));

        result.message = 'Success';
        return result;
    }

    async getAllMembersByTeamId(teamId) {
        const team = await this.data.teams.getById(teamId);
        const res = await team.getUsers();
        return res;
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
