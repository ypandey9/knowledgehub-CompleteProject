import { prisma } from "@/utils/prisma";
import { createLesson } from "./actions";

export default async function AdminLessonsPage() {
  const courses = await prisma.course.findMany();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Lesson</h1>

      {/* 🔴 encType is REQUIRED for file uploads */}
      <form
        action={createLesson}
        // encType="multipart/form-data"
        className="space-y-4"
      >
        {/* COURSE */}
        <select
          name="courseId"
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* TITLE */}
        <input
          name="title"
          required
          placeholder="Lesson title"
          className="w-full border px-3 py-2 rounded"
        />

        {/* ORDER */}
        <input
          name="order"
          type="number"
          required
          placeholder="Lesson order (1, 2, 3...)"
          className="w-full border px-3 py-2 rounded"
        />

        {/* ✅ VIDEO UPLOAD */}
        <input
          type="file"
          name="video"
          accept="video/*"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create Lesson
        </button>
      </form>
    </div>
  );
}
