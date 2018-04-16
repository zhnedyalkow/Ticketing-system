const {
    Comments,
    Company,
    Label,
    Notification,
    Statuse,
    Team,
    Ticket,
    User,
} = require('../../db/models/');

const Data = require('./generic.data');

module.exports = {
    comments: new Data(Comments),
    companies: new Data(Company),
    labels: new Data(Label),
    notifications: new Data(Notification),
    statuses: new Data(Status),
    teams: new Data(Team),
    tickets: new Data(Ticket),
    users: new Data(User),
};