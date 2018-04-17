const ticketsRoutes = require('./tickets.routes');
// const apiRoutes = require('./tickets.api.routes');

const init = (app, data) => {
    ticketsRoutes.init(app, data);
    // apiRoutes.init(app, data);
};

module.exports = {
    init,
};
