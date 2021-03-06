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

    getOneByCriteria(findObj, attributes = {}) {
        return this.Model.findOne({
            where: findObj,
            attributes: attributes,
        });
    }

    update(obj, options) {
        return this.Model.update(obj, options);
    }

    getAllByCriteria(findObj, attributes = {}) {
        return this.Model.findAll({
            where: findObj,
            attributes: attributes,
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
    findCreateFind(obj) {
        return this.Model.findCreateFind({
            where: obj,
            defaults: obj,
        });
    }
}

module.exports = Data;
