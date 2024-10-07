import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";
import { convertPropertyPricePerNight } from "../../utils/propertyUtils.js";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });
  if (!property) {
    throw new NotFoundError(id, "properties");
  }
  return convertPropertyPricePerNight(property);
};

export default getPropertyById;
