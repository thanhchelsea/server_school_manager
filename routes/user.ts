import express from 'express';
import { userController } from '../controllers/index';
const router = express.Router();


router.post("/login", userController.login);
router.post("/insertUser", userController.insertUser);

export default router;