import express from 'express';
import { userController } from '../controllers/index';
import { verifyAccessToken } from '../middlewares/auth';
const router = express.Router();


router.post("/login", userController.login);
router.post("/insertUser", verifyAccessToken, userController.insertUser);
router.post("/checkLogin", userController.loginWithSessionId);
export default router;