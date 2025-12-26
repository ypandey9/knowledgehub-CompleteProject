import { createCourse } from "./actions";

export default function AdminCoursesPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>

      <form action={createCourse} className="space-y-4">
        <input
          name="title"
          placeholder="Course title"
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Course description"
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="level"
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Course
        </button>
      </form>
    </div>
  );
}
