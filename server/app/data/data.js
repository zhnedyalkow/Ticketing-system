const {
    Comments,
    Company,
    Label,
    Notification,
    Status,
    Ticket,
    User,
} = require('../../db/models/');

const Data = require('./generic.data');
const TeamData = require('./team.data');

module.exports = {
    comments: new Data(Comments),
    companies: new Data(Company),
    labels: new Data(Label),
    notifications: new Data(Notification),
    statuses: new Data(Status),
    teams: new TeamData(),
    tickets: new Data(Ticket),
    users: new Data(User),
};
