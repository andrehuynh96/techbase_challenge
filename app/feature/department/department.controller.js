const Employee = require('app/model/techbase').employees;
const Department = require('app/model/techbase').departments;
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

      const { count: total, rows: items } = await Department.findAndCountAll({
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
      const departmentId = req.params.id;
      const department = await Department.findOne({
        include: [{
          model: Employee,
          as: "Employees"
      }],
        where: {
          id: departmentId
        },
      })
      if(!department) {
        return res.badRequest("Department not found");
      }
      return res.ok(department);
    }
    catch (error) {
      logger.error("Get employee detail fail: ", error);
      next(error);
    }
  }
};

