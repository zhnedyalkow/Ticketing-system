const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

class UserController {
    constructor(data) {
        this.data = data;
    }

    async register(registerInfo) {
        try {
            if (!registerInfo.name) {
                throw new Error('Fucking error!!!');
            }

            if (registerInfo.name.length === 0) {
                throw new Error('Please, fill your names!');
            }

            if (registerInfo.password.length < 3) {
                throw new Error('The password must be more then 3 symbols');
            }

            const checkEmail = await this.data.users.getOneByCriteria({
                email: registerInfo.email,
            });

            if (checkEmail) {
                throw new Error('The email is alredy used');
            }

            registerInfo.role = 'User';

            await this.data.users.create(registerInfo);
        } catch (error) {
            throw error;
        }

        return {
            info: true,
        };
    }

    async login(obj) {
        let result;
        try {
            // Get the user from database
            const user = await this.data.users.getOneByCriteria({
                email: obj.email,
            });

            if (!user) {
                throw new Error('No such user found');
            }

            if (user.password === obj.password) {
                const payload = {
                    id: user.id,
                    role: user.role,
                    exp: 1624408615,
                };
                const token = jwt.sign(payload, jwtOptions.secretOrKey);

                result = {
                    message: 'ok',
                    token: token,
                };
            } else {
                throw new Error('passwords did not match');
            }
        } catch (error) {
            throw error;
        }

        return result;
    }

    async addUserToCompany(email, requester) {
        let user;

        try {
            if (requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            user = await this.data.users.getOneByCriteria({
                email: email,
            });

            if (!user) {
                throw new Error('The user doesn\'t exist!');
            }

            if (user.CompanyId !== null) {
                throw new Error('The user already has a company!');
            }

            const updatedData = await this
                .data.users.update({
                    CompanyId: requester.CompanyId,
                }, {
                        where: {
                            id: user.id,
                        },
                    });

            if (updatedData[0] === 0) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            throw error;
        }

        return user;
    }

    async addUsersToTeam(users, teamName, requester) {
        let theUsers;

        try {
            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
                CompanyId: requester.CompanyId,
            });

            if (!team) {
                throw new Error('The team dosen\'t exist!');
            }

            if (team.TeamManagerId !== requester.id &&
                requester.role !== 'admin'
            ) {
                throw new Error('You have not permission to do that!');
            }

            // Remove all useless mail
            theUsers = users.map((x) => x.email);
            theUsers = new Set(theUsers);
            theUsers = [...theUsers];

            theUsers = await Promise.all(theUsers.map(async (user) => {
                const res = await this.data.users.getOneByCriteria({
                    email: user,
                    CompanyId: requester.CompanyId,
                }, {
                    exclude: ['password', 'updatedAt',
                        'CompanyId', 'deletedAt', 'role', 'createdAt',
                    ],
                });

                if (!res) {
                    throw new Error(`User with following
                    email => ${user}, doesn't exist!`);
                }

                return res;
            }));

            await team.addUsers(theUsers);

            // Create new notification to all assigned users
            await Promise.all(theUsers.map(async (user) => {
                const notification = await this.data.notifications.create({
                    name: 'New Team',
                    UserId: user.id,
                    description: `You have been 
                assigned to a new team "${team.name}"!`,
                });

                return await this.data.newNotifications.create({
                    UserId: user.id,
                    NotificationId: notification.id,
                });
            }));
        } catch (error) {
            throw error;
        }

        return theUsers;
    }

    async getAllUsers(requester) {
        let result;

        try {
            if (requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            result = this.data.users.getAllByCriteria({
                CompanyId: requester.CompanyId,
            }, {
                    exclude: ['password', 'updatedAt',
                        'CompanyId', 'id',
                    ],
                });
        } catch (error) {
            throw error;
        }

        return result;
    }

    async getAllUserOfTeam(teamName, requester) {
        let result;

        try {
            if (!teamName) {
                throw new Error('Please, add a team!');
            }

            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
                CompanyId: requester.CompanyId,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            if (team.CompanyId !== requester.CompanyId) {
                throw new Error('Something went wrong!');
            }

            const hasUser = await team.hasUser(requester);
            if (!hasUser && requester.role !== 'admin') {
                throw new Error('Something went wrong!');
            }

            result = await team.getUsers({
                attributes: ['name', 'email'],
            });
        } catch (error) {
            throw error;
        }

        return result;
    }
}

module.exports = UserController;
