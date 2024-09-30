import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/notFoundError.js";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const deleted = await prisma.host.deleteMany({
    where: { id },
  });
  if (!deleted || deleted.count === 0) {
    throw new NotFoundError(id, "hosts");
  }
  return { message: `Host with id ${id} was succesfully deleted` };
};

export default deleteHostById;
