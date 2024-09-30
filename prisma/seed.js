import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json" with { type: "json" };
import bookingData from "../src/data/bookings.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };
import reviewData from "../src/data/reviews.json" with { type: "json" };
import userData from "../src/data/users.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // Create hosts
  const { hosts } = hostData;
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Create properties
  const { properties } = propertyData;
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  // Create users
  const { users } = userData;
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Create amenities
  const { amenities } = amenityData;
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Create bookings
  const { bookings } = bookingData;
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  // Create reviews
  const { reviews } = reviewData;
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
