'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Companies', [{
                id: 1,
                name: 'Tick 42',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 2,
                name: 'Telerik Academy',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                name: 'Progress',
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Companies', null, {});
    },
};
