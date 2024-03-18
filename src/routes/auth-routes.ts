import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth-controllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/", createUser);
// router.delete("/:id", deleteUser);

export default router;
