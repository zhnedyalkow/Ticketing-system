const usersRoutes = require('./users.routes');

const init = (app, data) => {
    usersRoutes.init(app, data);
};

module.exports = {
    init,
};
