import { Router } from "express";
import {
  createCategory,
  getCategoryById,
} from "../controllers/category-controllers";

const router = Router();

router.get("/:id", getCategoryById);
router.post("/", createCategory);

export default router;
