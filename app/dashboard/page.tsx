import { redirect } from "next/navigation";
import { getDashboardData } from "@/app/actions/getDashboardData";
import DashboardClient from "./DashboardClient";
import { COURSES } from "../courses/data";

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data) redirect("/login");

  const enrolledCourses = COURSES.filter((c) =>
    data.courseIds.includes(c.id)
  );

  return (
    <DashboardClient
      courses={enrolledCourses}
      progress={data.progress}
    />
  );
}
