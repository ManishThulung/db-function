import { Router } from "express";
import {
  createCategory,
  getCategoryById,
  getMainCategoryById,
} from "../controllers/category-controllers";

const router = Router();

// router.get("/", getUsers);
router.get("/:id", getCategoryById);
router.get("/main/:id", getMainCategoryById);
router.post("/", createCategory);

export default router;
