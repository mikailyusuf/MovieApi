import prisma from "./prisma";
import bcrypt from "bcryptjs";

export interface User {
  fullname: string;
  email: string;
  avatar: string;
  id: number;
  password: string;
}

export const createUser = async (
  fullname: string,
  password: string,
  avatar: string,
  email: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      fullname: fullname,
      avatar: avatar,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
