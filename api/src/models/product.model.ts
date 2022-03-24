import Sequelize, { ModelDefined, Optional } from 'sequelize';

import { Product } from '../interfaces/product.interface';

export interface ProductCreationAttributes extends Optional<Product, 'id'> {}

export function initProduct(
  sequalize: Sequelize.Sequelize
): ModelDefined<Product, ProductCreationAttributes> {
  const attributes = {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
  };
  const Product: ModelDefined<
    Product,
    ProductCreationAttributes
  > = sequalize.define('Product', attributes, { tableName: 'products' });
  return Product;
}