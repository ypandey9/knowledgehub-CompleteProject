"use client";

import { useState } from "react";
import { createLesson } from "@/app/admin/lessons/actions";

export default function NewLessonForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Please select a video");

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("order", String(order));
    formData.append("courseId", courseId);
    formData.append("video", file);

    await createLesson(formData);
    setLoading(false);

    setTitle("");
    setOrder(1);
    setFile(null);
    alert("Lesson created");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="border p-2 w-full"
        placeholder="Lesson title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Order"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
        required
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        required
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Create Lesson"}
      </button>
    </form>
  );
}
