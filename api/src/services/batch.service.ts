import axios from "axios";
import { Op, Sequelize } from "sequelize";

import * as productRepository from "../repositories/product.repository";

export const exportModifiedProducts = async (): Promise<void> => {
  const where = {
    updatedAt: {
      [Op.gte]: Sequelize.literal("(NOW() - INTERVAL 5 MINUTE)"),
    },
  };

  const products = await productRepository.findAllWhereNotPaginated(where);

  if (products.length) {
    axios
      .post(String(process.env.WEBHOOK_URL), {
        modifiedProducts: products,
      })
      .catch(console.log);
  }
};
