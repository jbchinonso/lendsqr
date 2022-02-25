import express from "express";
import http from "http";
import indexRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

export default app;
