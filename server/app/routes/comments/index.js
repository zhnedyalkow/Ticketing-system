const commentsRoutes = require('./comments.routes');

const init = (app, data) => {
    commentsRoutes.init(app, data);
};

module.exports = {
    init,
};
