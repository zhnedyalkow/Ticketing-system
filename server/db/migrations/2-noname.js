'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "UserId" from table "Tickets"
 * removeColumn "creator" from table "Tickets"
 * addColumn "CreatorId" to table "Tickets"
 * addColumn "AssignedUserId" to table "Tickets"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-04-17T13:15:36.887Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Tickets", "UserId"]
    },
    {
        fn: "removeColumn",
        params: ["Tickets", "creator"]
    },
    {
        fn: "addColumn",
        params: [
            "Tickets",
            "CreatorId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Tickets",
            "AssignedUserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
