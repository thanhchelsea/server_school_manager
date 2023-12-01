import express from 'express';
import { roleController } from '../controllers/index';
const router = express.Router();

router.post("/insertRoles", roleController.insertRole);
router.get("/getRoleByIds", roleController.getRoleByIds);
router.delete("/deleteRoleByIds", roleController.deleteRoleByIds)

export default router;