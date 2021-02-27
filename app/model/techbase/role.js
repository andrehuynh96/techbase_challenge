const RoleName = require('app/model/techbase/value-object/role-name');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: RoleName.EMPLOYEE
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    deleted_flg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
      underscored: true,
      timestamps: true,
    });
    // Role.associate = (models) => {
    //   // associations can be defined here
    //   Role.hasMany(models.employees, { foreignKey: 'role_id' })
    // };
    return Role;
}
