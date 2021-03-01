module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employees", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
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
    Employee.associate = (models) => {
      Employee.belongsTo(models.departments, {
        as: 'Departments',
        foreignKey: 'department_id',
        targetKey: 'id'
      });
    }
    return Employee;
}
