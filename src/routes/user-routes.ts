import { Router } from "express";
import {
  createStore,
  createUser,
  deleteUser,
  getStores,
  getUserById,
  getUsers,
} from "../controllers/user-controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

router.get("/store/stores", getStores);
router.post("/store/create", createStore);

export default router;
