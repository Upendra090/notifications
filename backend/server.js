import { APP_PORT, DB_URI } from "./utils/constants.js";
import mongoose from "mongoose";
import app from "./app.js";

const port = APP_PORT;
const database_url = DB_URI;

mongoose
  .connect(database_url)
  .then(() => console.log("db connected!"))
  .catch((err) => {
    console.log("error while connecting db!", err);
  });

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
