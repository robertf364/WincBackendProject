import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  let query = {
    where: {
      location,
      pricePerNight,
    },
  };
  if (amenities) {
    query.where.amenities = {
      some: {
        name: {
          contains: amenities,
        },
      },
    };
  }
  const properties = await prisma.property.findMany(query);
  return properties;
};

export default getProperties;
