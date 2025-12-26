import { COURSES } from "@/app/courses/data";
import { generateCertificate } from "./generate";

export function DownloadButton({ courseId }: { courseId: string }) {
  async function handleDownload() {
    const course = COURSES.find((c) => c.id === courseId);

    const pdfBytes = await generateCertificate({
      courseId,
      courseTitle: course?.title ?? courseId,
    });

    // ✅ FINAL FIX — safest & TS-correct
    const blob = new Blob(
      [new Uint8Array(pdfBytes)],
      { type: "application/pdf" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.pdf";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Download Certificate (PDF)
    </button>
  );
}
