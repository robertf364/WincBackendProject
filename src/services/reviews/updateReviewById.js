import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const updated = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
  if (!updated || updated.count === 0) {
    throw new NotFoundError(id, "reviews");
  }
  return { message: `Review with id ${id} was succesfully updated` };
};

export default updateReviewById;
