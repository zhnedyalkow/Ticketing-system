const ticketsRoutes = require('./tickets.routes');

const init = (app, data) => {
    ticketsRoutes.init(app, data);
};

module.exports = {
    init,
};
