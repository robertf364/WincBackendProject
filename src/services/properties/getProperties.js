import { PrismaClient } from "@prisma/client";
import { convertMultiplePropertyPricePerNight } from "../../utils/propertyUtils.js";

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
  let properties = await prisma.property.findMany(query);
  properties = convertMultiplePropertyPricePerNight(properties);
  return properties;
};

export default getProperties;
