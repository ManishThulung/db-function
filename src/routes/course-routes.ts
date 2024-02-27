import { Router } from "express";
import {
  // createCourse,
  // deleteCourse,
  getCourseById,
  getCourses,
} from "../controllers/course-controllers";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
// router.delete("/:id", deleteCourse);

export default router;
