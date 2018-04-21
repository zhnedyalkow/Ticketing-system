'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('TeamMembers', [{
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                UserId: '1',
                TeamId: '1',
            },
            {
                createdAt: '2018-03-20 05:19:42',
                updatedAt: '2018-03-20 05:20:50',
                UserId: '2',
                TeamId: '2',
            },
            {
                createdAt: '2018-03-21 09:19:42',
                updatedAt: '2018-03-21 10:20:50',
                UserId: '3',
                TeamId: '3',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('TeamMembers', null, {});
    },
};
