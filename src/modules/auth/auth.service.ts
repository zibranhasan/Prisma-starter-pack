import { prisma } from "../../app/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

const loginWithEmailAndPassword = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== payload.password) {
    throw new Error("Invalid password");
  }

  return user;
};

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const authWithGoogle = async (idToken: string) => {
const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  //   const ticket = await client.verifyIdToken({
  //     idToken,
  //     audience: process.env.GOOGLE_CLIENT_ID,
  //   });

  //   const payload = ticket.getPayload();

  //   if (!payload) {
  //     throw new Error("Invalid Google Token");
  //   }

  //   const { email, name, picture, email_verified } = payload;

  let user = await prisma.user.findUnique({
    where: {
      email: data.email!,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }

  return user;
};

export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
