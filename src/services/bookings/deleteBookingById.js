import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.booking.deleteMany({
    where: { id },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "bookings");
  }
  return { message: `Booking with id ${id} was succesfully deleted` };
};

export default deleteBookingById;
