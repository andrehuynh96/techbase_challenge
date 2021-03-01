const Employee = require('app/model/techbase').employees;
const Department = require('app/model/techbase').departments;
const Team = require('app/model/techbase').teams;
const EmployeeTeam = require('app/model/techbase').employee_teams;
const RoleName = require('app/model/techbase/value-object/role-name');
const logger = require('app/lib/logger');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  search: async (req,res,next) => {
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

      const { count: total, rows: items } = await Employee.findAndCountAll({
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

  getDetails: async (req,res,next) => {
    try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({
        where: {
          id: employeeId
        },
        raw: true
      })
      if(!employee) {
        return res.badRequest("Employee not found")
      }
      if( employee.role_id === 1) {
        employee.role = RoleName.DIRECTOR;
      }
      if( employee.role_id == 2 && employee.department_id) {
        employee.role = RoleName.MANAGER;
        const department = await Department.findOne({
          where: {
            id: employee.department_id
          }
        });
        employee.department = department;
      }
      if( employee.role_id == 3) {
        employee.role = RoleName.EMPLOYEE;
        const employeeTeams = await EmployeeTeam.findAll({
          where: {
            employee_id: employee.id
          }
        });

        const listTeamId = employeeTeams.map(item => item.team_id);

        if(listTeamId.length) {
          const teams = await Team.findAll({
            where: {
              id: listTeamId
            }
          });
          employee.teams = teams;
        }
      }
      return res.ok(employee);
    }
    catch (error) {
      logger.error("Get employee detail fail: ", error);
      next(error);
    }
  }
};
