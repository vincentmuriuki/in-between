import express from "express";
import users from "../../controllers/auth.controller";
import catchErrors from "../../utils/helper";

const router = express.Router();

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     security: []
 *     summary: User Signup
 *     description: Creates a new user account
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   token:
 *                     type: string
 *     responses:
 *       201:
 *         description: created
 */
router.post("/auth/signup", (req, res) => users.createUser(req, res));

export default router;
