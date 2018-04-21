const notificationRoutes = require('./notification.routes');

const init = (app, data) => {
    notificationRoutes.init(app, data);
};

module.exports = {
    init,
};
