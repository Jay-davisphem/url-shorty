import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { corsMiddleware } from "./middleware/cors";
import limiter from "./middleware/rateLimiting";

const app: Application = express();
app.use(morgan("dev"));

app.use(corsMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.get("/test", (req: Request, res: Response) => {
  res.json({
    data: {
      url: req.url,
      others: [req.httpVersion, req.ips, req.ip, req.cookies],
    },
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke",
  });
});

export default app;
