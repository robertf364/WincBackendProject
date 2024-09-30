import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.amenity.deleteMany({
    where: { id },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "amenities");
  }
  return { message: `Amenity with id ${id} was succesfully deleted` };
};

export default deleteAmenityById;
