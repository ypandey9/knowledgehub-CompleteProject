"use server";

import { prisma } from "@/utils/prisma";
import { requireAdmin } from "@/app/lib/adminGuard";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string;

  await prisma.course.create({
    data: { title, description, level },
  });

  redirect("/admin");
}
