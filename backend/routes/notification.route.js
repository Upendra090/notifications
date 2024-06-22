import express from "express";
import { sendNotification } from "../controllers/notification.controller.js";

const router = express.Router();
router.route("/send-notification").post(sendNotification);

export { router as notificationRouter };
