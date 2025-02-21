import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./DB/database";
import registeruser from "./router/user.router";
import providers from "./router/provider.router";
import appointment from "./router/appointment.router";
import review from "./router/review.router";
import searchProvider from "./router/search.router";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/ach/", registeruser);
app.use("/api/ach/providers", providers);
app.use("/api/ach/appointment", appointment);
app.use("/api/ach/providers/nearest", searchProvider);
app.use("/api/ach/review", review);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  connectDb();
  console.log(`listening at port ${port}`);
});
