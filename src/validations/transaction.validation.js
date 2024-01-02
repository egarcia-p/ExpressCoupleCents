const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTransaction = {
  body: Joi.object().keys({
    isExpense: Joi.boolean().required(),
    amount: Joi.number().required(),
    establishment: Joi.string().required,
    category: Joi.string().required(),
    isEssential: Joi.boolean().required(),
    user: Joi.string().custom(objectId),
    family: Joi.string().custom(objectId),
    transactionDate: Joi.date().required(),
  }),
};

const getTransactions = {
  query: Joi.object().keys({
    family: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

const updateTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      isExpense: Joi.boolean().required(),
      amount: Joi.number().required(),
      establishment: Joi.string().required,
      category: Joi.string().required(),
      isEssential: Joi.boolean().required(),
      user: Joi.string().custom(objectId),
      family: Joi.string().custom(objectId),
      transactionDate: Joi.date().required(),
    })
    .min(1),
};

const deleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
