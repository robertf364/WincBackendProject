import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });
  if (!booking) {
    throw new NotFoundError(id, "bookings");
  }
  return booking;
};

export default getBookingById;
