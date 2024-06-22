import TokenModel from "../models/token.model.js";

export const saveToken = async (req, res) => {
  const { fcmToken } = req.body;
  if (!fcmToken)
    return res.status(400).json({
      status: "failed",
      message: "Please provide valid information!",
    });

  try {
    const doesExist = await TokenModel.findOne({ token: fcmToken });

    if (doesExist)
      return res.status(400).json({
        status: "failed",
        message: "Token already exist!",
      });

    const result = await TokenModel.create({ token: fcmToken });

    return res.status(201).json({
      status: "success",
      message: "Token Stored!",
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

export const getAllToken = async (req, res) => {
  try {
    const result = await TokenModel.find();

    return res.status(200).json({
      status: "success",
      message: "All tokens!",
      tokens: result,
    });
  } catch (err) {
    console.log("ERROR 🔥", err);
    return res.status(500).json({
      status: "failed",
      message: "SOMETHING WENT WRONG!",
    });
  }
};
