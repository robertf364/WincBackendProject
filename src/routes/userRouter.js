import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import auth from "../middleware/authMiddleware.js";
import { checkRequiredArguments } from "../utils/checkRequiredInput.js";
import missingArgsMiddleware from "../middleware/missingArgumentsMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  const { username, email } = req.query;
  const users = await getUsers(username, email);
  res.status(200).json(users);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    try {
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      // Check input
      const requiredArguments = [
        "username",
        "password",
        "name",
        "email",
        "phoneNumber",
        "profilePicture",
      ];
      checkRequiredArguments(req, requiredArguments, "user");
      const user = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
  missingArgsMiddleware
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const message = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await deleteUserById(id);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
