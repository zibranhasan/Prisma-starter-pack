import { prisma } from "../../app/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

const createUser = async (payload: any) => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany();

  return result;
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateUser = async (id: number, payload: any) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUser = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
