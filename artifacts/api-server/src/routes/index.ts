import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminAuthRouter from "./admin-auth";
import projectsRouter from "./projects";
import skillsRouter from "./skills";
import experiencesRouter from "./experiences";
import profileRouter from "./profile";
import seedRouter from "./seed";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(projectsRouter);
router.use(skillsRouter);
router.use(experiencesRouter);
router.use(profileRouter);
router.use(seedRouter);

export default router;
