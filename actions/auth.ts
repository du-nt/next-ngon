"use server";

import prisma from "@/libs/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validation
  if (!email || !firstName || !lastName || !password || !confirmPassword) {
    throw new Error("Email is required");
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);

  await prisma.user.create({
    data: {
      email: email.toString(),
      firstName: firstName.toString(),
      lastName: lastName.toString(),
      password: hashedPassword,
      provider: "credentials",
    },
  });

  redirect("/login");
}

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validation
  if (!email || !password) {
    throw new Error("Email is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(password.toString(), user.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign({ userId: user.id }, "test", {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId: user.id }, "test", {
    expiresIn: "7d",
  });

  cookies().set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  cookies().set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export async function logout() {
  // check if user is authenticated
  console.log("xxxxxxxxx");
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  console.log("first");
}
