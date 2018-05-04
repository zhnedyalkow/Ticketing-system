'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                id: 1,
                avatar: '/faces//ayo-ogunseinde-2.jpg',
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
                avatar: '/faces/clem-onojeghuo-3.jpg',
                email: 'yavorsstoychev@gmail.com',
                name: 'Yavor Stoychev',
                password: '12345678',
                role: 'user',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 3,
                avatar: '/faces/joe-gardner-2.jpg',
                email: 'babapenka@gmail.com',
                name: 'Penka Dobreva',
                password: '12345678',
                role: 'user',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 4,
                avatar: '/faces/kaci-baum-2.jpg',
                email: 'natalia@gmail.com',
                name: 'Natalia Georgieva',
                password: '12345678',
                role: 'user',
                CompanyId: 1,
                createdAt: '2018-03-18 08:19:42',
                updatedAt: '2018-03-18 08:20:50',
                deletedAt: null,
            },
            {
                id: 5,
                avatar: '/faces/erik-lucatero-2.jpg',
                email: 'zhi@gmail.com',
                name: 'Zhitomir Oreshenski',
                password: '12345678',
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