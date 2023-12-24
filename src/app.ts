import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import { corsMiddleware } from "./middleware/cors";
import limiter from "./middleware/rateLimiting";

const app: Application = express();

app.use(corsMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

export default app;
