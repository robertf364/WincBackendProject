import express from "express";
import loginRouter from "./routes/loginRoute.js";

const app = express();

app.use(express.json());
app.use("/login", loginRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
