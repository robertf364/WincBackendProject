import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.review.deleteMany({
    where: { id },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "reviews");
  }
  return { message: `Review with id ${id} was succesfully deleted` };
};

export default deleteReviewById;
