import express from "express"
import { authFunction } from "../middleware/auth.js";
import { deleteProject, getProjectById, getProjectPreview, getPublishedProjects, revision, rollbackToVersion, saveProjectCode } from "../controllers/projectController.js";


const projectRouter = express.Router();
projectRouter.post("/revision/:projectId", authFunction, revision);
projectRouter.put("/save/:projectId", authFunction, saveProjectCode);
projectRouter.put("/rollback/:projectId/:versionId", authFunction, rollbackToVersion);
projectRouter.delete("/:projectId", authFunction, deleteProject);
projectRouter.get("/preview/:projectId", authFunction, getProjectPreview);
projectRouter.get("/published", getPublishedProjects);
projectRouter.get("/published/:projectId", getProjectById);

export default projectRouter;