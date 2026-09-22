import express from "express";
import { createUserProject, getAllUserProjects,  getUserCredits,  getUserProject,  purchaseCredits,  togglePublish } from "../controllers/userController.js";
import { authFunction } from "../middleware/auth.js";

const userRouter = express.Router();
userRouter.get("/credits", authFunction, getUserCredits);
userRouter.post("/project", authFunction, createUserProject);
userRouter.get("/project/:projectId", authFunction, getUserProject);
userRouter.get("/projects", authFunction, getAllUserProjects);
userRouter.get("/toggle-publish/:projectId", authFunction, togglePublish);
userRouter.post("/purchase-credits", authFunction, purchaseCredits);

export default userRouter;



