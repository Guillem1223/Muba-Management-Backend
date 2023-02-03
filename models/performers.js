const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return performers.init(sequelize, DataTypes);
}

class performers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    performers_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_decription: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    rate_nonprofit_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate_150_capacity_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate_300_capacity_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate_350_capacity_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate_1000_capacity_event: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    users_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'users_type_id'
      }
    }
  }, {
    sequelize,
    tableName: 'performers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "performers_id" },
        ]
      },
      {
        name: "users_type_id",
        using: "BTREE",
        fields: [
          { name: "users_type_id" },
        ]
      },
    ]
  });
  }
}
