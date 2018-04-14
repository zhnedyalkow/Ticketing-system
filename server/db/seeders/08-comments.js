'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Comments', [{
                id: 1,
                description: 'Someting comment1',
                UserId: '1',
                TicketId: '1',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 2,
                description: 'Someting comment2',
                UserId: '2',
                TicketId: '2',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 3,
                description: 'Someting comment3',
                UserId: '3',
                TicketId: '3',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Comments', null, {});
    }
};