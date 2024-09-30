import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.user.deleteMany({
    where: { id },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "users");
  }
  return { message: `User with id ${id} was succesfully deleted` };
};

export default deleteUserById;
