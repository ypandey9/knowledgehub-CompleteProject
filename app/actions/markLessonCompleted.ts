"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function markLessonCompleted(
  courseId: string,
  lessonId: string
) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) return;

  const user = JSON.parse(auth.value);

  await prisma.lessonProgress.upsert({
    where: {
      userId_courseId_lessonId: {
        userId: user.id,
        courseId,
        lessonId,
      },
    },
    update: {
      completed: true,
    },
    create: {
      userId: user.id,
      courseId,
      lessonId,
      completed: true,
    },
  });
}
