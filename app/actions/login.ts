"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    throw new Error("All fields are required");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  // ✅ FIX: cookies() IS ASYNC
  const cookieStore = await cookies();

  cookieStore.set(
    "auth_user",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role,
    }),
    {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    }
  );

  redirect("/dashboard");
}
