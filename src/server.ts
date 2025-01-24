import express from "express";
import "dotenv/config";
import connectDb from "./DB/database";
import registeruser from "./router/user.router";

const app = express();
app.use(express.json());
app.use("/api/healthcare/", registeruser);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectDb();
  console.log(`listening at port ${port}`);
});
