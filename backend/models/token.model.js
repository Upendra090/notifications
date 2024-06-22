import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
  },

  { timestamps: true }
);

const TokenModel = mongoose.model("TokenModel", tokenSchema);

export default TokenModel;
