"use client";

import { createCourse } from "./action";

export default function NewCoursePage() {
  async function handleSubmit(formData: FormData) {
    await createCourse(formData);
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-xl font-bold">Create Course</h2>

      <input
        name="title"
        placeholder="Course title"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Course description"
        className="w-full border p-2 rounded"
      />

      <input
        name="level"
        placeholder="Beginner / Intermediate"
        className="w-full border p-2 rounded"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Create Course
      </button>
    </form>
  );
}
