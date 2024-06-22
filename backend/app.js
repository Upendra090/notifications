import express from "express";
import cors from "cors";
import { notificationRouter } from "./routes/notification.route.js";
import admin from "firebase-admin";
import { tokenRouter } from "./routes/token.route.js";
const serviceAccount =
  "./utils/notifications-e2a73-firebase-adminsdk-lql3a-2218ba0848.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "server is running!",
  });
});

app.use("/api/v1", notificationRouter);
app.use("/api/v1", tokenRouter);

export default app;
