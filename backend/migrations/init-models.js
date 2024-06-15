var DataTypes = require("sequelize").DataTypes;
var _note = require("../models/note");

function initModels(sequelize) {
    var note = _note(sequelize, DataTypes);

    return {
        note,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
