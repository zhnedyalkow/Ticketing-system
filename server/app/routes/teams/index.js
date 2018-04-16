const teamsRoutes = require('./teams.routes');
const apiRoutes = require('./teams.api.routes');

const init = (app, data) => {
    teamsRoutes.init(app, data);
    apiRoutes.init(app, data);
}

module.exports = {
    init,
};