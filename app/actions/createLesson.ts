"use server";

import { prisma } from "@/utils/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function createLesson(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const title = formData.get("title") as string;
  const orderValue = formData.get("order");
  const video = formData.get("video") as File;

  if (!courseId || !title || !video) {
    throw new Error("Missing fields");
  }

  // 📁 Ensure upload directory exists
  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/videos"
  );
  await mkdir(uploadDir, { recursive: true });

  // 🎥 Save video
  const bytes = await video.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${video.name}`;
  const uploadPath = path.join(uploadDir, fileName);

  await writeFile(uploadPath, buffer);

  // 🔢 Determine lesson order
  let order: number;

  if (orderValue) {
    order = Number(orderValue);
  } else {
    const lastLesson = await prisma.lesson.findFirst({
      where: { courseId },
      orderBy: { order: "desc" },
    });

    order = lastLesson ? lastLesson.order + 1 : 1;
  }

  // 💾 Save lesson to DB
  await prisma.lesson.create({
    data: {
      courseId,
      title,
      order,
      videoUrl: `/uploads/videos/${fileName}`,
    },
  });
}
