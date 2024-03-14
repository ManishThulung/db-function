import { Router } from "express";
import {
  createStore,
  createUser,
  deleteUser,
  generateCsv,
  generateCsvById,
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

router.get("/generate-csv/:id", generateCsv);
router.get("/generate-csv/export/:id", generateCsvById);

export default router;
