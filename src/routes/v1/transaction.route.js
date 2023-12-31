const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('getUsers'), validate(transactionValidation.createTransaction), transactionController.createTransaction)
  .get(auth('getUsers'), validate(transactionValidation.getTransactions), transactionController.getTransactions);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(transactionValidation.getTransaction), transactionController.getTransaction)
  .patch(auth('getUsers'), validate(transactionValidation.updateTransaction), transactionController.updateTransaction)
  .delete(auth('getUsers'), validate(transactionValidation.deleteTransaction), transactionController.deleteTransaction);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management and retrieval
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     description: Only admins can create other transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isExpense
 *               - amount
 *               - note
 *               - establishment
 *               - category
 *               - isEssential
 *               - userId
 *               - familyId
 *               - transactionDate
 *             properties:
 *               isExpense:
 *                 type: boolean
 *               amount:
 *                 type: decimal
 *               note:
 *                 type: string
 *               establishment:
 *                  type: string
 *               category:
 *                  type: string
 *               isEssential:
 *                 type: boolean
 *               user:
 *                  type: string
 *               family:
 *                  type: string
 *               transactionDate:
 *                 type: date
 *             example:
 *               isExpense: true
 *               amount: 100.0
 *               note: Expense for Electricity
 *               establishment: ENRGY
 *               category: Home Bills
 *               isEssential: true
 *               user: userId
 *               family: familyId
 *               transactionDate: MM/DD/YYYY
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all transactions
 *     description: Only users can retrieve all transactions.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: family
 *         schema:
 *           type: string
 *         description: Family Id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of transactions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a transaction
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isExpense:
 *                 type: boolean
 *               amount:
 *                 type: decimal
 *               note:
 *                 type: string
 *               establishment:
 *                  type: string
 *               category:
 *                  type: string
 *               isEssential:
 *                 type: boolean
 *               userId:
 *                  type: string
 *               familyId:
 *                  type: string
 *               transactionDate:
 *                 type: date
 *             example:
 *               isExpense: true
 *               amount: 100.0
 *               note: Expense for Electricity
 *               establishment: ENRGY
 *               category: Home Bills
 *               isEssential: true
 *               userId: userId
 *               familyId: familyId
 *               transactionDate: MM/DD/YYYY
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transaction'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a transaction
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
