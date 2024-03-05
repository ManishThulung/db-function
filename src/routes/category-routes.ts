import { Router } from "express";
import { createCategory } from "../controllers/category-controllers";

const router = Router();

// router.get("/", getUsers);
// router.get("/:id", getUserById);
router.post("/", createCategory);

export default router;
