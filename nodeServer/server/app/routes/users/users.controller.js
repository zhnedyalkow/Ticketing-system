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

    // async addUserToTeam(email, teamId) {
    //     let user;
    //     let team;

    //     try {
    //         team = await this.data.teams.getById(teamId);

    //         user = await this.data.users.getOneByCriteria({
    //             email: email,
    //         });

    //         if (!user) {
    //             throw new Error('The user doesn\'t exist!');
    //         }

    //         if (user.id === team.TeamManagerId) {
    //             // throw new Error('Something went wrong! 1');
    //             throw new Error('The team has already this user!');
    //         }

    //         const hasUser = await team.hasUser(user);

    //         if (hasUser && user.role === 'admin') {
    //             throw new Error('Something went wrong! 2');
    //         }

    //         const newUser = await this.data.teammembers.create({
    //             UserId: creator.id,
    //             TeamId: obj.ticketId,
    //         });

    //         if (updatedData[0] === 0) {
    //             throw new Error('Something went wrong 3!');
    //         }
    //     } catch (error) {
    //         throw error;
    //     }

    //     return user;
    // }

    async getAllUsers(CompanyId) {
        let result;

        try {
            result = this.data.users.getAllByCriteria({
                CompanyId: CompanyId,
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

    async amIAdmin(userId) {
        const user = await this.data.users.getById(userId);

        if (user.role !== 'admin') {
            return false;
        }

        return true;
    }

    /* TODO => need to add permission for admin */
    async getAllUserOfTeam(teamName, user) {
        let result;

        try {
            if (!teamName) {
                throw new Error('Please, add a team!');
            }

            if (!user) {
                throw new Error('There is no such user!');
            }

            const team = await this.data.teams.getOneByCriteria({
                name: teamName,
                CompanyId: user.CompanyId,
            });

            if (!team) {
                throw new Error('There is no such a team!');
            }

            const hasUser = await team.hasUser(user);

            if (!hasUser) {
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
