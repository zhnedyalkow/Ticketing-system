// cost registerInfo = {
//     name: "Yavor Stoychev",
//     password: "123",
//     email: "qs277@abv.bg",
// };

// Check whether email is valid
const validateEmail = (email) => {
    const re = `/^(([^<>()[\]\\
    .,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)
    |(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.
    [0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]
    +\.)+[a-zA-Z]{2,}))$/`;

    return re.test(email);
};

class UserController {
    constructor(data) {
        this.data = data;
    }

    async register(registerInfo) {
        try {
            if (registerInfo.name.length === 0) {
                throw new Error('Please, fill yout names!');
            }

            if (registerInfo.password.length < 3) {
                throw new Error('The password must be more then 3 symbols');
            }

            if (!validateEmail(registerInfo.email)) {
                throw new Error('Invalid email address!');
            }

            registerInfo.role = 'User';

            await this.data.users.create(registerInfo);
        } catch (error) {
            throw error;
        }

        return { info: true };
    }
}

module.exports = UserController;
