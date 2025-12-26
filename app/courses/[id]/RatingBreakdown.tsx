 "use client";

// export default function RatingBreakdown({ reviews }: { reviews: any[] }) {
//   // Count ratings
//   const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

//   reviews.forEach((r) => {
//     counts[r.rating] = (counts[r.rating] || 0) + 1;
//   });

//   const total = reviews.length || 1; // avoid divide by zero

//   return (
//     <div className="mt-6 p-4 bg-gray-50 rounded border">
//       <h3 className="text-lg font-semibold mb-3">Rating Breakdown</h3>

//       <div className="space-y-2">
//         {[5, 4, 3, 2, 1].map((star) => {
//           const percent = Math.round((counts[star] / total) * 100);

//           return (
//             <div key={star} className="flex items-center gap-3">
//               {/* STAR LABEL */}
//               <span className="w-12 font-medium">{star} ★</span>

//               {/* BAR */}
//               <div className="flex-1 h-3 bg-gray-200 rounded">
//                 <div
//                   className="h-3 bg-yellow-500 rounded"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>

//               {/* PERCENT */}
//               <span className="w-10 text-right text-sm text-gray-600">
//                 {percent}%
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

type Rating = 1 | 2 | 3 | 4 | 5;

export default function RatingBreakdown({
  reviews,
}: {
  reviews: { rating: Rating }[];
}) {
  const counts: Record<Rating, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((r) => {
    counts[r.rating] += 1;
  });

  const total = reviews.length || 1;

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="flex items-center gap-2">
          <span className="w-12">{star}★</span>
          <div className="flex-1 bg-gray-200 h-2 rounded">
            <div
              className="bg-yellow-500 h-2 rounded"
              style={{
                width: `${(counts[star as Rating] / total) * 100}%`,
              }}
            />
          </div>
          <span className="w-10 text-right">{counts[star as Rating]}</span>
        </div>
      ))}
    </div>
  );
}

