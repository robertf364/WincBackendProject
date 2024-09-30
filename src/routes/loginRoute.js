import { Router } from "express";
import authenticateUser from "../services/login/authenticate.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // Fetch user
  let user;
  try {
    user = await authenticateUser(username, password);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  if (!user) {
    return res.status(401).json({
      message:
        "Failed to authenticate. Combination of username and password does not exist.",
    });
  }
  // Return token
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Succesfully logged in.", token });
});

export default router;
