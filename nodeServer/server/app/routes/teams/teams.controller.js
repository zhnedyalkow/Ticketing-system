
class TeamsController {
    constructor(data) {
        this.data = data;
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
        allUsers = await Promise.all(allUsers.map(async (user) => {
            const res = await this.data.users.getOneByCriteria({
                email: user,
                CompanyId: creator.CompanyId,
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

    async deleteTeam(teamName, user) {
        try {
            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
                CompanyId: user.CompanyId,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            if (team.CompanyId !== user.CompanyId) {
                throw new Error('Something went wrong!');
            }

            if (team.TeamManagerId !== user.id && user.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            await team.destroy();
        } catch (error) {
            throw error;
        }

        return {
            success: true,
        };
    }

    async getMyTeams(user) {
        let teamList;

        try {
            if (user.role === 'admin') {
                teamList = await this.data.teams.getAllTeam(user.CompanyId);
            }

            if (user.role === 'user') {
                teamList = await this.data.teams.getMyTeams(user);
            }

            // Get lenght of memebers array
            teamList = await Promise.all(teamList.map(async (team) => {
                team.dataValues.members = (await team.getUsers()).length;

                return team;
            }));
        } catch (error) {
            throw error;
        }

        return teamList;
    }

    async getTeamManager(teamName, requester) {
        let teamManager;

        try {
            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
                CompanyId: requester.CompanyId,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            const hasUser = await team.hasUser(requester);
            if (!hasUser && requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            teamManager = await team.getTeamManager({
                attributes: ['id', 'name', 'email'],
            });
        } catch (error) {
            throw error;
        }

        return teamManager;
    }
}

module.exports = TeamsController;
