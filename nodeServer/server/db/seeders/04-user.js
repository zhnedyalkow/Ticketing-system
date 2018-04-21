'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                id: 1,
                email: 'zh.nedyalkow@gmail.com',
                name: 'admin',
                password: '123',
                role: 'admin',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 2,
                email: 'yavorsstoychev@gmail.com',
                name: 'yavorss',
                password: '123',
                role: 'user',
                CompanyId: 2,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            },
            {
                id: 3,
                email: 'zh.nedyalkow@gmail.com',
                name: 'zh.nedyalkow',
                password: '123',
                role: 'user',
                CompanyId: 3,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};