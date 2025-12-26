"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function enrollCourse(courseId: string) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) throw new Error("Not authenticated");

  const user = JSON.parse(auth.value);

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      courseId,
    },
  });
}

export async function unenrollCourse(courseId: string) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) throw new Error("Not authenticated");

  const user = JSON.parse(auth.value);

  await prisma.enrollment.deleteMany({
    where: {
      userId: user.id,
      courseId,
    },
  });
}
