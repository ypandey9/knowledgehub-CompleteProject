"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createLesson } from "@/app/actions/createLesson";

export default function CreateLessonPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!video) return alert("Please select a video");

    setLoading(true);

    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("order", String(order));
    formData.append("video", video);

    await createLesson(formData);

    setLoading(false);
    router.push(`/admin`);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Lesson title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          required
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
}
