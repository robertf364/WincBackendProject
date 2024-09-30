import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const updated = await prisma.booking.updateMany({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
  if (!updated || updated.count === 0) {
    throw new NotFoundError(id, "bookings");
  }
  return { message: `Booking with id ${id} was succesfully updated` };
};

export default updateBookingById;
