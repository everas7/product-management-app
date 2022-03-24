import Joi from 'joi';

export const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

export const get = {
  query: Joi.object().keys({
    filters: Joi.object().keys({
      minPrice: Joi.number(),
      maxPrice: Joi.number(),
    }),
    page: Joi.number().greater(0),
    pageSize: Joi.number().greater(0),
  }),
};

export const getById = {
  params: Joi.object().keys({ id: Joi.number().required() }),
};

export const update = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
};
