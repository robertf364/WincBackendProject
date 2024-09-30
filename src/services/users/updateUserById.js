import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updated = await prisma.user.updateMany({
    where: { id },
    data: { username, password, name, email, phoneNumber, profilePicture },
  });
  if (!updated || updated.count === 0) {
    throw new NotFoundError(id, "users");
  }
  return { message: `User with id ${id} was succesfully updated` };
};

export default updateUserById;
