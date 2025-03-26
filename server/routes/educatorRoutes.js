import express from 'express'
import { updateRoleToEducator } from "../controllers/EducatorController.js";

const educatorRouter = express.Router()

educatorRouter.get('update-role',updateRoleToEducator)

export default educatorRouter;

