'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'jdoe@test.com',
        roles: JSON.stringify(['PRODUCT_CREATOR', 'PRODUCT_MANAGER']),
        password: await bcrypt.hash('strongpassword1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jack Sparrow',
        email: 'jsparrow@test.com',
        roles: JSON.stringify(['PRODUCT_PRICING']),
        password: await bcrypt.hash('strongpassword1', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
