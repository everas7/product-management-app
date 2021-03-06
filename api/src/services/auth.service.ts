import bcrypt from "bcrypt";
import { LoginForm } from "../interfaces/auth.interface";
import * as userRepository from "../repositories/user.repository";
import { User } from "../interfaces/user.interface";
import httpStatus from "http-status";

export const login = async (
  loginForm: LoginForm
): Promise<User | undefined> => {
  const user = await userRepository.findByEmail(loginForm.email);
  if (user) {
    const isValidPassword = await bcrypt.compare(
      loginForm.password,
      user.password
    );
    if (isValidPassword) return user;
    throw {
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Invalid email or password",
    };
  }
};
