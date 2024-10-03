import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = prisma.booking.findMany({
    where: { userId },
  });
  return bookings;
};

export default getBookings;
