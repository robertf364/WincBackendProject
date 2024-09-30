import express from "express";
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";

const app = express();

app.use(express.json());
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/hosts", hostRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
