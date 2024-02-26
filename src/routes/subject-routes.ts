import { Router } from "express";
import {
  getSubjects
} from "../controllers/subject-controllers";

const router = Router();

router.get("/", getSubjects);
// router.get("/:id", getSubjectById);
// router.post("/", createSubject);
// router.patch("/:id", updateSubject);
// router.delete("/:id", deleteSubject);

export default router;
