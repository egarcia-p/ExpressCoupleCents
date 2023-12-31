const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { familyService } = require('../services');

const createFamily = catchAsync(async (req, res) => {
  const family = await familyService.createFamily(req.body);
  res.status(httpStatus.CREATED).send(family);
});

const getFamilies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await familyService.queryFamilies(filter, options);
  res.send(result);
});

const getFamily = catchAsync(async (req, res) => {
  const familiy = await familyService.getFamilyById(req.params.familyId);
  if (!familiy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Family not found');
  }
  res.send(familiy);
});

const deleteFamily = catchAsync(async (req, res) => {
  await familyService.deleteFamilyById(req.params.familyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFamily,
  getFamilies,
  getFamily,
  deleteFamily,
};
