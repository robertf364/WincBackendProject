import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json" with { type: "json" };
import bookingData from "../src/data/bookings.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };
import reviewData from "../src/data/reviews.json" with { type: "json" };
import userData from "../src/data/users.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  // Delete existing data (in order to avoid foreign key conflicts)
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  await prisma.host.deleteMany();

  // Create hosts
  const { hosts } = hostData;
  for (const host of hosts) {
    await prisma.host.create({
      data: host,
    });
  }

  // Create properties
  const { properties } = propertyData;
  for (const property of properties) {
    await prisma.property.create({
      data: property,
    });
  }

  // Create users
  const { users } = userData;
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Create amenities
  const { amenities } = amenityData;
  for (const amenity of amenities) {
    await prisma.amenity.create({
      data: amenity,
    });
  }

  // Create bookings
  const { bookings } = bookingData;
  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking,
    });
  }

  // Create reviews
  const { reviews } = reviewData;
  for (const review of reviews) {
    await prisma.review.create({
      data: review,
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