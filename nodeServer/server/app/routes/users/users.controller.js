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

    validateEmail(email) {
        const re = `/^(([^<>()[\]\\
        .,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)
        |(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.
        [0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]
        +\.)+[a-zA-Z]{2,}))$/`;

        return re.test(email);
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

            // const a = this.validateEmail(registerInfo.email);

            // if (!this.validateEmail(registerInfo.email)) {
            //     throw new Error('Invalid email address!');
            // }

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

        return { info: true };
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
    async getUserByEmail(email) {
        return await this.data.users.getOneByCriteria({
            email: email,
        });
    }
}

module.exports = UserController;
