import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const updated = await prisma.host.updateMany({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
  if (!updated || updated.count === 0) {
    throw new NotFoundError(id, "hosts");
  }
  return { message: `Host with id ${id} was succesfully updated` };
};

export default updateHostById;
