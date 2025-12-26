"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function createLesson(formData: FormData) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth_user");
  if (!auth) throw new Error("Unauthorized");

  const user = JSON.parse(auth.value);

  // 🔒 Optional: verify admin role from DB if needed

  const title = formData.get("title") as string;
  const order = Number(formData.get("order"));
  const courseId = formData.get("courseId") as string;
  const file = formData.get("video") as File;

  if (!file) throw new Error("No video uploaded");

  // 🔹 Save video file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${randomUUID()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/videos");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);

  const videoUrl = `/uploads/videos/${fileName}`;

  // 🔹 Save lesson in DB
  await prisma.lesson.create({
    data: {
      title,
      order,
      courseId,
      videoUrl,
    },
  });
}
