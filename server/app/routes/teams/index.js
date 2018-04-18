const teamsRoutes = require('./teams.routes');

const init = (app, data) => {
    teamsRoutes.init(app, data);
};

module.exports = {
    init,
};
