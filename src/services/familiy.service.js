const httpStatus = require('http-status');
const { Family } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a family
 * @param {Object} familyBody
 * @returns {Promise<Family>}
 */
const createFamily = async (familyBody) => {
  return Family.create(familyBody);
};

/**
 * Query for families
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFamilies = async (filter, options) => {
  const families = await Family.paginate(filter, options);
  return families;
};

/**
 * Get family by id
 * @param {ObjectId} id
 * @returns {Promise<Family>}
 */
const getFamilyById = async (id) => {
  const family = Family.findById(id).populate('users').exec();
  console.log('Family:' + family.users);
  return family;
};

/**
 * Delete family by id
 * @param {ObjectId} familyId
 * @returns {Promise<Family>}
 */
const deleteFamilyById = async (familyId) => {
  const family = await getFamilyById(familyId);
  if (!family) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Family not found');
  }
  await family.remove();
  return family;
};

module.exports = {
  createFamily,
  queryFamilies,
  getFamilyById,
  deleteFamilyById,
};
