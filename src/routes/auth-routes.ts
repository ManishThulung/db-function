import { Router } from "express";
import {
  loginUser,
  loginUserGoogleApp,
  registerUser,
  verifyLogin,
  verifyLoginGoogleApp,
} from "../controllers/auth-controllers";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyLogin);
router.post("/google/verify", verifyLoginGoogleApp);
router.post("/google/login", loginUserGoogleApp);

export default router;
