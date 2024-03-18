import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyLogin,
} from "../controllers/auth-controllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyLogin);
// router.delete("/:id", deleteUser);

export default router;
