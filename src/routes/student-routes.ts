import { Router } from "express";
import {
  getStudents,
  createStudent,
  getStudentById,
  deleteStudent,
} from "../controllers/student-controllers";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);

export default router;
