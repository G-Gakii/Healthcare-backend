import express from "express";
import "dotenv/config";
import connectDb from "./DB/database";
import registeruser from "./router/user.router";
import providers from "./router/provider.router";
import appointment from "./router/appointment.router";
import review from "./router/review.router";

const app = express();
app.use(express.json());
app.use("/api/ach/", registeruser);
app.use("/api/ach/", providers);
app.use("/api/ach/", appointment);
app.use("/api/ach/", review);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectDb();
  console.log(`listening at port ${port}`);
});
