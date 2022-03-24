import { Sequelize } from 'sequelize';
import { initProduct } from './product.model';

import { initUser } from './user.model';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
  User: initUser(sequelize),
  Product: initProduct(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
