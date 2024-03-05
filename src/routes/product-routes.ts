import { Router } from "express";
import { createProduct } from "../controllers/product-controllets";

const router = Router();

// router.get("/", getUsers);
// router.get("/:id", getUserById);
router.post("/", createProduct);

export default router;
