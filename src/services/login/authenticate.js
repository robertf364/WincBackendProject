import { PrismaClient } from "@prisma/client";

const authenticateUser = async (username, password) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { username: username, password: password },
  });
  return user;
};

export default authenticateUser;
