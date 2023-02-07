const { sequelize } = require("./models/index");
const initModels = require("./models/init-models");

const models = initModels(sequelize);

module.exports = models;
