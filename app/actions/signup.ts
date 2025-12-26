"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !username || !password) {
    throw new Error("All fields required");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashed,
    },
  });

  // ✅ FIX: await cookies()
  const cookieStore = await cookies();

  cookieStore.set(
    "auth_user",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    }),
    {
      httpOnly: true,
      path: "/",
    }
  );
}
