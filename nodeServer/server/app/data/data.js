const {
    Comments,
    Company,
    Label,
    Status,
    User,
    NewNotification,
} = require('../../db/models/');

const Data = require('./generic.data');
const TeamData = require('./team.data');
const TicketData = require('./ticket.data');
const NotificationData = require('./notification.data');
const CommentsData = require('./comments.data');

module.exports = {
    comments: new CommentsData(),
    companies: new Data(Company),
    labels: new Data(Label),
    notifications: new NotificationData(),
    statuses: new Data(Status),
    teams: new TeamData(),
    tickets: new TicketData(),
    users: new Data(User),
    newNotifications: new Data(NewNotification),
};
