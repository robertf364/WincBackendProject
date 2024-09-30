import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json({ amenities });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      res.status(200).json({ amenity });
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;
    const amenity = await createAmenity(name);
    res.status(201).json({ amenity });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const message = await updateAmenityById(id, name);
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
      const message = await deleteAmenityById(id);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
