const EmployeeTeam = require('app/model/techbase').employee_teams;

const employeeTeams = [
  {
    employee_id: 3,
    team_id: 4,

  },
  {
    employee_id: 3,
    team_id: 5

  },
  {
    employee_id: 3,
    team_id: 6
  },
  {
    employee_id: 4,
    team_id: 2
  },
];

module.exports = async () =>  {
  try {
    const willInitEmployeeTeams = [];
    for( let employeeTeam of employeeTeams) {
      const employeeTeamDetail = await EmployeeTeam.findOne({
        where: {
          employee_id: employeeTeam.employee_id,
          team_id: employeeTeam.team_id
        }
      });
      if(!employeeTeamDetail) {
        willInitEmployeeTeams.push(employeeTeam);
      }
    }

    if(willInitEmployeeTeams.length) {
      await EmployeeTeam.bulkCreate(
        willInitEmployeeTeams,
        {
        returning: true
        }
      );
    }
  }
  catch (error){
    console.log(error)
  }
};
