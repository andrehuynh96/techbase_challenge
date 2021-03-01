const Department = require('app/model/techbase').departments;
const DepartmentName = require('app/model/techbase/value-object/department-name');
module.exports = async () => {
  try {
    const departmentNames = Object.keys(DepartmentName);
    const willInitDepartment = [];
    for (let departmentName of departmentNames) {
      const departmentDetail = await Department.findOne({
        where: {
          name: departmentName
        }
      });
      if (!departmentDetail) {
        willInitDepartment.push({
          name: departmentName
        });
      }
    }
    if (willInitDepartment.length) {
      await Department.bulkCreate(
        willInitDepartment,
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
