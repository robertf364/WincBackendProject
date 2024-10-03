import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location,
      pricePerNight,
      amenities: {
        some: {
          name: {
            contains: amenities,
          },
        },
      },
    },
  });
  return properties;
};

export default getProperties;
