import express from "express";
import "dotenv/config";
import connectDb from "./DB/database";
import registeruser from "./router/user.router";
import providers from "./router/provider.router";

const app = express();
app.use(express.json());
app.use("/api/ach/", registeruser);
app.use("/api/ach/", providers);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectDb();
  console.log(`listening at port ${port}`);
});
