const DepartmentName = require('app/model/techbase/value-object/department-name');

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("departments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: DepartmentName.DEVELOPMENT
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
  }, {
      underscored: true,
      timestamps: true,
    });

    return Department;
}
