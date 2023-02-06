const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return contracts.init(sequelize, DataTypes);
};

class contracts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        contracts_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        event_description: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        rate_type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        contract_status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        event_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        event_direction: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        event_shedule: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        invoice_status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        performers_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "performers",
            key: "performers_id",
          },
        },
      },
      {
        sequelize,
        tableName: "contracts",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "contracts_id" }],
          },
          {
            name: "performers_id",
            using: "BTREE",
            fields: [{ name: "performers_id" }],
          },
        ],
      }
    );
  }
}
