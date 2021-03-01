const Employee = require('app/model/techbase').employees;
const EmployeeTeam = require('app/model/techbase').employee_teams;
const Team = require('app/model/techbase').teams;
const logger = require('app/lib/logger');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  search: async (req, res, next) => {
    try {
      const { query } = req;
      const limit = query.limit ? parseInt(req.query.limit) : 10;
      const offset = query.offset ? parseInt(req.query.offset) : 0;

      const where = {};
      if (query.name) {
        where.name ={
          [Op.iLike]: `%${query.name}%`
        } ;
      }

      const { count: total, rows: items } = await Team.findAndCountAll({
        limit,
        offset,
        where: where,
        order: [['created_at', 'DESC']]
      });

      return res.ok({
        items: items.length > 0 ? items : [],
        offset: offset,
        limit: limit,
        total: total
      });
    }
    catch (error) {
      logger.error("search employee fail: ", error);
      next(error);
    }
  },
  getEmployeeOfTeam: async (req,res,next) => {
    try {
      const teamId = req.params.id;
      const team = await Team.findOne({
        where: {
          id: teamId
        },
        raw: true
      });

      if(!team) {
        return res.badRequest("Team not found");
      }

      const employeeTeams = await EmployeeTeam.findAll({
        where: {
          team_id: teamId
        }
      })

      if(employeeTeams.length) {
        const listEmployeeId = employeeTeams.map(item => item.employee_id);
        const employees = await Employee.findAll({
          where: {
            id: listEmployeeId
          }
        });

        if (employees.length) {
          team.employees = employees;
        }
      }

      return res.ok(team);
    }
    catch (error) {
      logger.error("Get employee detail fail: ", error);
      next(error);
    }
  }
};

