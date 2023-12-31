const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFamily = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getFamilies = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFamily = {
  params: Joi.object().keys({
    familyId: Joi.string().custom(objectId),
  }),
};

const deleteFamily = {
  params: Joi.object().keys({
    familyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFamily,
  getFamilies,
  getFamily,
  deleteFamily,
};
