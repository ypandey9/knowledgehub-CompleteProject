// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
    },
  });

  return NextResponse.json(courses);
}
