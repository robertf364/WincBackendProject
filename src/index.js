import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";
import propertyRouter from "./routes/propertyRouter.js";
import amenityRouter from "./routes/amenityRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertyRouter);
app.use("/amenities", amenityRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
