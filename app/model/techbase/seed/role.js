const Role = require('app/model/techbase').roles;

const ListRole = {
  DIRECTOR: {
    "name": "DIRECTOR",
    "level": 1
  },
  MANAGER: {
    "name": "MANAGER",
    "level": 2
  },
  EMPLOYEE: {
    "name": "EMPLOYEE",
    "level": 3
  }
};

module.exports = async () =>  {
  try {
    const roleNames = Object.keys(ListRole);
    const willInitRoles = [];
    for( let roleName of roleNames) {
      const roleDetail = await Role.findOne({
        where: {
          name: roleName
        }
      });
      if(!roleDetail) {
        willInitRoles.push(ListRole[roleName]);
      }
    }

    if(willInitRoles.length) {
      await Role.bulkCreate(
        willInitRoles,
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
