module.exports = (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define("employee_teams", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
    });

    return EmployeeTeam;
}
