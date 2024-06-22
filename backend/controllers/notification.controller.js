import admin from "firebase-admin";
import TokenModel from "../models/token.model.js";

export const sendNotification = async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({
      status: "failed",
      message: "Please provide valid information!",
    });

  try {
    const tokens = await TokenModel.find();
    const fcmTokens = tokens.map((token) => token.token);

    console.log(fcmTokens);

    const notificationObject = {
      tokens: fcmTokens,
      notification: {
        title: title,
        body: description,
      },
      data: {
        click_action: "https://kupendra-v2.netlify.app",
      },
    };

    const result = await admin
      .messaging()
      .sendEachForMulticast(notificationObject);

    return res.status(200).json({
      status: "success",
      message: "Notifications sent!",
      tokens,
      fcmTokens,
      result,
    });
  } catch (err) {
    console.log("ERROR 🔥", err);
    return res.status(500).json({
      status: "failed",
      message: "SOMETHING WENT WRONG!",
    });
  }
};
