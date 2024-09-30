import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.property.deleteMany({
    where: {
      id,
    },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "properties");
  }
  return { message: `Property with id ${id} was succesfully deleted` };
};

export default deletePropertyById;
