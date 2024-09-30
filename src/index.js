import express from "express";
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";
import propertyRouter from "./routes/propertyRouter.js";
import amenityRouter from "./routes/amenityRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

const app = express();

app.use(express.json());
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertyRouter);
app.use("/amenities", amenityRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
