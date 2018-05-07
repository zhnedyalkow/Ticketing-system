'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Notifications', [{
                id: 1,
                name: 'You have been assigned to a new team Team1',
                description: 'You have been assigned to a new team Team1',
                UserId: '1',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 2,
                name: 'You have been assigned to a new team Team2',
                description: 'You have been assigned to a new team Team2',
                UserId: '2',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                name: 'You have been assigned to a new team Team3"',
                description: 'You have been assigned to a new team Team3',
                UserId: '3',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Notifications', null, {});
    }
};