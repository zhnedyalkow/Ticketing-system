const {
    User,
    Label,
    Status,
} = require('../../db/models');

class Data {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = this.includes;
    }

    getAll() {
        return this.Model.findAll();
    }

    getById(id) {
        return this.Model.findById(id, {
            includes: this.includes,
        });
    }

    getFullInfoForTicket(id) {
        const res = this.Model.findOne({
            where: {
                id: id,
            },
            include: [{
                model: User,
                as: 'Creator',
            },
            {
                model: User,
                as: 'AssignedUser',
            },
            {
                model: Label,
            },
            {
                model: Status,
            }],
        });

        return res;
    }

    getOneByCriteria(findObj) {
        return this.Model.findOne({
            where: findObj,
        });
    }
    getAllByCriteria(findObj) {
        return this.Model.findAll({
            where: findObj,
        });
    }

    create(obj) {
        return this.Model.create(obj);
    }

    delete(obj) {
        return this.Model.destroy({
            where: obj,
        });
    }
}

module.exports = Data;
