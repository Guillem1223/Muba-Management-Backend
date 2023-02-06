Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return contractor.init(sequelize, DataTypes);
};

class contractor extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        contractor_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        tax_data: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        backline: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        technical_rider: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        contracts_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "contracts",
            key: "contracts_id",
          },
        },
        users_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "users_type_id",
          },
        },
      },
      {
        sequelize,
        tableName: "contractor",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "contractor_id" }],
          },
          {
            name: "contracts_id",
            using: "BTREE",
            fields: [{ name: "contracts_id" }],
          },
          {
            name: "users_type_id",
            using: "BTREE",
            fields: [{ name: "users_type_id" }],
          },
        ],
      }
    );
  }
}
