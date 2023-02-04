const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
}

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    users_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    nombre_user: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user','performer','contractor','admin','super_admin'),
      allowNull: true,
      defaultValue: "user"
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "users_type_id" },
        ]
      },
    ]
  });
  }
}
