
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
        // *TODO => CHECK WEATHER EMAIL IS INVALID
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

    async deleteTeam(teamId, user) {
        try {
            const team = await this.data.teams.getById(teamId);

            if (!team) {
                throw new Error('This team is already deleted!');
            }

            if (team.CompanyId !== user.CompanyId) {
                throw new Error('Something went wrong! 1');
            }

            const hasUser = await team.hasUser(user);

            if (team.TeamManagerId !== user.id && user.role !== 'admin') {
                throw new Error('Something went wrong! 2');
            }

            if (!hasUser && user.role !== 'admin') {
                throw new Error('Something went wrong! 3');
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
                teamList = await this.data.teams.getAllByCriteria({
                    CompanyId: user.CompanyId,
                });
            }

            if (user.role === 'user') {
                teamList = await user.getTeams();
            }
        } catch (error) {
            throw error;
        }

        return teamList;
    }
}

module.exports = TeamsController;
