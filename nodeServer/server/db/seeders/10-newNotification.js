'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('NewNotifications', [{
                UserId: '1',
                NotificationId: '1',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                UserId: '2',
                NotificationId: '2',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                UserId: '3',
                NotificationId: '3',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('NewNotifications', null, {});
    },
};
