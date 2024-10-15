import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import auth from "../middleware/authMiddleware.js";
import { checkRequiredArguments } from "../utils/checkRequiredInput.js";
import missingArgsMiddleware from "../middleware/missingArgumentsMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);
      res.status(200).json(property);
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
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
      } = req.body;
      // Check input
      const requiredArguments = [
        "title",
        "description",
        "location",
        "pricePerNight",
        "bedroomCount",
        "bathRoomCount",
        "maxGuestCount",
        "hostId",
        "rating",
      ];
      checkRequiredArguments(req, requiredArguments, "property");
      const property = await createProperty(
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
      );
      res.status(201).json(property);
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
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
      } = req.body;
      const message = await updatePropertyById(
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
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
      const message = await deletePropertyById(id);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
