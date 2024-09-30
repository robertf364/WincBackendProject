import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({
    where: { id },
  });
  if (!review) {
    throw new NotFoundError(id, "reviews");
  }
  return review;
};

export default getReviewById;
