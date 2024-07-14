// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config";
import { createUser, findUserByEmail } from "../user";

export const signup = async (req: Request, res: Response) => {
  const { email, fullname, avatar, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await createUser(fullname, password, avatar, email);
  const { password: userpassWord, ...otherData } = user;
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user: otherData });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  const { password: userpassWord, ...otherData } = user;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user: otherData });
};
