import express from "express";
import http from "http";
import indexRouter from "./routes/index";
import userRouter from "./routes/users"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter)

export default app;
