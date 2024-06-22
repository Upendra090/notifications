import express from "express";
import { getAllToken, saveToken } from "../controllers/token.controller.js";

const router = express.Router();
router.route("/save-token").post(saveToken);
router.route("/get-tokens").get(getAllToken);

export { router as tokenRouter };
