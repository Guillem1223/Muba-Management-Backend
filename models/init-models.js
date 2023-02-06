const DataTypes = require("sequelize").DataTypes;
const _contractor = require("./contractor");
const _contracts = require("./contracts");
const _performers = require("./performers");
const _users = require("./users");

function initModels(sequelize) {
  const contractor = _contractor(sequelize, DataTypes);
  const contracts = _contracts(sequelize, DataTypes);
  const performers = _performers(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  contractor.belongsTo(contracts, {
    as: "contract",
    foreignKey: "contracts_id",
  });
  contracts.hasMany(contractor, {
    as: "contractors",
    foreignKey: "contracts_id",
  });
  contracts.belongsTo(performers, {
    as: "performer",
    foreignKey: "performers_id",
  });
  performers.hasMany(contracts, {
    as: "contracts",
    foreignKey: "performers_id",
  });
  contractor.belongsTo(users, {
    as: "users_type",
    foreignKey: "users_type_id",
  });
  users.hasMany(contractor, { as: "contractors", foreignKey: "users_type_id" });
  performers.belongsTo(users, {
    as: "users_type",
    foreignKey: "users_type_id",
  });
  users.hasMany(performers, { as: "performers", foreignKey: "users_type_id" });

  return {
    contractor,
    contracts,
    performers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
