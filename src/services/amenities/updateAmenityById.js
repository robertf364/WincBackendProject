import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const updated = await prisma.amenity.updateMany({
    where: { id },
    data: { name },
  });
  if (!updated || updated.count === 0) {
    throw new NotFoundError(id, "amenities");
  }
  return { message: `Amenity with id ${id} was succesfully updated` };
};

export default updateAmenityById;
