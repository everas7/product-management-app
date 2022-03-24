'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        title: 'Wallet',
        description: 'Wallet to store cash',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Purse',
        description: 'Purse to store things',
        price: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Watch',
        description: 'Watch to see the time',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
