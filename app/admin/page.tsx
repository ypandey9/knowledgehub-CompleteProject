import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <Link
        href="/admin/courses"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Create New Course
      </Link>
    <div className="space-y-4">

      <Link
        href="/admin/lessons"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Lessons
      </Link>

    </div>
    </div>
  );
}
