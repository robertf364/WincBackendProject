import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: { location, pricePerNight },
  });
  return properties;
};

export default getProperties;
