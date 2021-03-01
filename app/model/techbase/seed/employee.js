const Employee = require('app/model/techbase').employees;

const ExampleEmployees = [
  {
    name: 'myhn',
    role_id: 2,
    department_id: 34

  },
  {
    name: 'hieunv',
    role_id: 3

  },
  {
    name: 'binhnt',
    role_id: 1
  },
];

module.exports = async () =>  {
  try {
    const willInitEmployees = [];
    for( let employee of ExampleEmployees) {
      const employeeDetail = await Employee.findOne({
        where: {
          name: employee.name
        }
      });
      if(!employeeDetail) {
        willInitEmployees.push(employee);
      }
    }

    if(willInitEmployees.length) {
      await Employee.bulkCreate(
        willInitEmployees,
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
