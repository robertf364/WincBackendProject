import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import auth from "../middleware/authMiddleware.js";
import { checkRequiredArguments } from "../utils/checkRequiredInput.js";
import missingArgsMiddleware from "../middleware/missingArgumentsMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      res.status(200).json(host);
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
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      // Check input
      const requiredArguments = [
        "username",
        "password",
        "name",
        "email",
        "phoneNumber",
        "profilePicture",
        "aboutMe",
      ];
      checkRequiredArguments(req, requiredArguments, "host");
      const host = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json(host);
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
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const message = await updateHostById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
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
      const message = await deleteHostById(id);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
