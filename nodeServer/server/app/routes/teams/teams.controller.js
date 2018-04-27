class TeamsController {
    constructor(data) {
        this.data = data;
    }

    async getTeamByTeamId(teamId) {
        const team = await this.data.teams.getById(teamId);
        return team;
    }

    async createTeam(obj, companyId, creator) {
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

        const isTeamExist = await this.data.teams.getOneByCriteria({
            name: obj.name,
            CompanyId: creator.CompanyId,
        });

        if (isTeamExist) {
            throw new Error(`The team ${obj.name} already exist!`);
        }

        // Remove all useless mail
        let allUsers = obj.users.map((x) => x.email);
        allUsers = new Set(allUsers);
        allUsers = [...allUsers];

        // Get all user by following email
        // *TODO => CHECK WEATHER EMAIL IS INVALID
        allUsers = await Promise.all(allUsers.map(async (user) => {
            const res = await this.data.users.getOneByCriteria({
                email: user,
            });

            if (!res) {
                throw new Error(`User with following
                email => ${user}, doesn't exist!`);
            }

            return res;
        }));

        // Add the creator to the team
        allUsers.push(creator);

        const newTeam = await this.data.teams.create({
            name: obj.name,
            CompanyId: companyId,
            TeamManagerId: creator.id,
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

    async getAllTeamsByCompanyId(companyId) {
        return await this.data.teams.getAllByCriteria({
            CompanyId: companyId,
        });
    }

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
