import { Router } from "express";
import {
  getStudents,
  // createStudent,
  // deleteStudent,
  // getStudentById,
  // updateStudent
} from "../controllers/student-controllers";

const router = Router();

router.get("/", getStudents);
// router.get("/:id", getStudentById);
// router.post("/", createStudent);
// router.patch("/:id", updateStudent);
// router.delete("/:id", deleteStudent);

export default router;
