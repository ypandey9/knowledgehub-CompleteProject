"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function getUserEnrollments() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) return [];

  const user = JSON.parse(auth.value);

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    select: { courseId: true },
  });

  return enrollments.map((e) => e.courseId);
}
