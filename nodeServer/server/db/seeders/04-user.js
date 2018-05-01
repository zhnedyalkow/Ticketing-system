'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                id: 1,
                email: 'zh.nedyalkow@gmail.com',
                name: 'admin',
                password: '12345678',
                role: 'admin',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 2,
                email: 'yavorsstoychev@gmail.com',
                name: 'yavorss',
                password: '12345678',
                role: 'user',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                email: 'babaPenka@gmail.com',
                name: 'Penka Dobreva',
                password: '123',
                role: 'user',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};