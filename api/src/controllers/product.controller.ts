import { Request, Response } from "express";
import httpStatus from "http-status";

import * as productService from "../services/product.service";
import * as userService from "../services/user.service";
import { User } from "../interfaces/user.interface";
import { ProductFilters } from "../interfaces/product.interface";
import { toProductDto } from "../dtos/product.dto";

export const get = async (req: Request, res: Response) => {
  const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
  const page = req.query.page ? +req.query.page : 1;
  const result = await productService.getAll(
    req.user as User,
    (req.query.filters as ProductFilters) || {},
    {
      pageSize,
      page,
    }
  );
  const totalPages = Math.ceil(result.count / pageSize);
  res.setHeader("Total-Pages", totalPages);
  res.status(httpStatus.OK).send(result.rows.map((u) => toProductDto(u)));
};

export const getById = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send(toProductDto(req.product!));
};

export const add = async (req: Request, res: Response) => {
  const product = await productService.add(req.body);
  res.status(httpStatus.OK).send(toProductDto(product));
};

export const update = async (req: Request, res: Response) => {
  const product = await productService.update(
    parseInt(req.params.id, 10),
    req.body
  );
  res.status(httpStatus.OK).send(toProductDto(product));
};

export const remove = async (req: Request, res: Response) => {
  await productService.remove(parseInt(req.params.id, 10));
  res.status(httpStatus.OK).send();
};
