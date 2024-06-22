import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please provide title"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    icon: String,
  },

  { timestamps: true }
);

const NotificationModel = mongoose.model(
  "NotificationModel",
  notificationSchema
);

export default NotificationModel;
