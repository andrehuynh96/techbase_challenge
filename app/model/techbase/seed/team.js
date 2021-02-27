const Team = require('app/model/techbase').teams;

const listTeam = [
  {
    name: 'BLOCKCHAIN',
    department_id: 36
  },
  {
    name: 'AI',
    department_id: 36
  },
  {
    name: 'MOBILE',
    department_id: 38
  },
  {
    name: 'FRONTEND',
    department_id: 38
  },
  {
    name: 'BACKEND',
    department_id: 38
  },
  {
    name: 'DEVOPS',
    department_id: 38
  }
]
module.exports = async () => {
  try {
    const willInitTeam = [];
    for (let team of listTeam) {
      const teamDetail = await Team.findOne({
        where: {
          name: team.name
        }
      });
      if (!teamDetail) {
        willInitTeam.push(team);
      }
    }
    if (willInitTeam.length) {
      await Team.bulkCreate(
        willInitTeam,
        {
          returning: true
        }
      );
    }
  }
  catch (error) {
    console.log(error)
  }
};
