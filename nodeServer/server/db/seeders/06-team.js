'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Teams', [{
                id: 1,
                name: 'Team1',
                CompanyId: 1,
                TeamManagerId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 2,
                name: 'Team2',
                CompanyId: 1,
                TeamManagerId: 2,
                createdAt: '2018-03-18 10:19:42',
                updatedAt: '2018-03-18 11:20:50',
            },
            {
                id: 3,
                name: 'Team3',
                CompanyId: 1,
                TeamManagerId: 3,
                createdAt: '2018-03-20 09:19:42',
                updatedAt: '2018-03-20 10:20:50',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Teams', null, {});
    },
};
