'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Tickets', [{
                id: 1,
                title: 'Ticket1',
                description: 'Ticket Description 1',
                dueDate: '2018-03-20 08:19:42',
                creator: 1,
                LabelId: 1,
                UserId: 1,
                TeamId: 1,
                StatusId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 2,
                title: 'Ticket2',
                description: 'Ticket Description 2',
                dueDate: '2018-03-20 08:19:42',
                creator: 2,
                LabelId: 2,
                UserId: 2,
                TeamId: 2,
                StatusId: 2,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 3,
                title: 'Ticket3',
                description: 'Ticket Description 3',
                dueDate: '2018-03-20 08:19:42',
                creator: 3,
                LabelId: 3,
                UserId: 3,
                TeamId: 3,
                StatusId: 3,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Tickets', null, {});
    }
};