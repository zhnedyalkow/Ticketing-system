'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Comments', [{
                id: 1,
                description: `Hello, 
                we are currently working on this issue and will let you know once we have more information.
                Please feel free to contact us in case any other questions.
                Best regards,
                Penka`,
                UserId: '3',
                TicketId: '1',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 2,
                description: `Hello Yavor, we are currently working on your request and
                encountered that each new comment appear in the beginning of comment.
                Could you please double check again and let me know if everything is correct.
                Please feel free to contact us in case any other issues.
                Best regards,
                Zhitomir`,
                UserId: '1',
                TicketId: '2',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                description: `Hello Natalia,
                We are currently working on this request and we found that everything seems to be correct.
                You are not able to see close button, because you do not have permissions to close it.
                Only admin and GM can close tracking issue.
                Please feel free to contact us in case any other questions.
                Best regards,
                Yavor`,
                UserId: '2',
                TicketId: '3',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Comments', null, {});
    },
};
