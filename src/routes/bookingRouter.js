import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      res.status(200).json({ booking });
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const booking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json({ booking });
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
      const {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const message = await updateBookingById(
        id,
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
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
      const message = await deleteBookingById(id);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
