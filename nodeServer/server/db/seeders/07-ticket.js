'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Tickets', [{
                id: 1,
                title: 'Cannot open my account',
                description: `Hello, I cannot access my account since yesterday(john.doe@gmail.com).
                Even though I type my username and password correctly it says: 'No such user found'.`,
                dueDate: '2018-03-20 08:19:42',
                CreatorId: 3,
                AssignedUserId: 1,
                LabelId: 1,
                TeamId: 1,
                StatusId: 4,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 2,
                title: `My comment in the comment's section cannot appear`,
                description: `Hello, when I try to answer some ticket #2 in the ticket system
                I cannot see my comment at the end of comment section.`,
                dueDate: '2018-03-20 08:19:42',
                CreatorId: 2,
                AssignedUserId: 3,
                LabelId: 2,
                TeamId: 2,
                StatusId: 4,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                title: 'After mark the ticket as complete cannot see close button',
                description: `Hello, I have already market ticket #3 as completed but
                 I am not able to see where is 'CLOSE' button. Could you please double check?`,
                dueDate: '2018-03-20 08:19:42',
                CreatorId: 1,
                AssignedUserId: 4,
                LabelId: 3,
                TeamId: 3,
                StatusId: 4,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Tickets', null, {});
    },
};
