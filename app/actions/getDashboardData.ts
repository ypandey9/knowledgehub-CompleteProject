"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function getDashboardData() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) return null;

  const user = JSON.parse(auth.value);

  // 1️⃣ Enrolled courses
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
  });

  const courseIds = enrollments.map((e) => e.courseId);

  // 2️⃣ Lesson progress
  const progress = await prisma.lessonProgress.findMany({
    where: {
      userId: user.id,
      completed: true,
    },
  });

  return {
    courseIds,
    progress,
  };
}
