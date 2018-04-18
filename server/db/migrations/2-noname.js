'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "description" to table "Notifications"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-04-18T09:12:25.088Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Notifications",
        "description",
        {
            "type": Sequelize.STRING
        }
    ]
}];

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
