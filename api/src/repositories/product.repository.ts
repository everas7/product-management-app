import { WhereAttributeHash, AndOperator, OrOperator } from "sequelize/types";
import { Fn, Literal, Where } from "sequelize/types/lib/utils";
import { Pagination, PaginatedResult } from "../interfaces/custom.interface";
import { Product } from "../interfaces/product.interface";
import db from "../models";
import { ProductCreationAttributes } from "../models/product.model";

type WhereType =
  | Fn
  | Literal
  | Where
  | WhereAttributeHash<Product>
  | AndOperator<Product>
  | OrOperator<Product>
  | undefined;

export const findAll = async (): Promise<Product[]> => {
  return db.Product.findAll().then((ul) =>
    ul.map((ul) => ul.get({ plain: true }))
  );
};

export const findAllWhere = async (
  where: WhereType,
  { page, pageSize }: Pagination
): Promise<PaginatedResult<Product>> => {
  const offset = Math.max(0, page! - 1) * pageSize!;
  const limit = pageSize;
  return db.Product.findAndCountAll({
    where,
    offset,
    limit,
  }).then((res) => ({
    count: res.count,
    rows: res.rows.map((p) => p.get({ plain: true })),
  }));
};

export const findAllWhereNotPaginated = async (
  where: WhereType
): Promise<Product[]> => {
  return db.Product.findAll({
    where,
  }).then((ul) => ul.map((ul) => ul.get({ plain: true })));
};

export const findById = async (id: number): Promise<Product | undefined> => {
  return db.Product.findByPk(id).then((m) =>
    m?.get({
      plain: true,
    })
  );
};

export const create = async (
  product: ProductCreationAttributes
): Promise<Product> => {
  return db.Product.create(product).then(
    (u) => findById(u.getDataValue("id")) as Promise<Product>
  );
};

export const update = async (
  id: number,
  product: ProductCreationAttributes
): Promise<Product> => {
  return db.Product.update(product, {
    where: {
      id,
    },
  }).then(() => findById(id) as Promise<Product>);
};

export const remove = async (id: number): Promise<number> => {
  return db.Product.destroy({
    where: {
      id,
    },
  });
};
