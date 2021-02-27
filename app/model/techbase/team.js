const TeamName = require('app/model/techbase/value-object/team-name');

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("teams", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: TeamName.FRONTEND
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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

    return Team;
}
