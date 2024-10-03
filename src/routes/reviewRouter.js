import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import notFoundMiddleware from "../middleware/notFoundMiddleware.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import auth from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const review = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(review);
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
      const { userId, propertyId, rating, comment } = req.body;
      const message = await updateReviewById(
        id,
        userId,
        propertyId,
        rating,
        comment
      );
      res.status(200).json({ message });
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
      const message = await deleteReviewById(id);
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  },
  notFoundMiddleware
);

export default router;
