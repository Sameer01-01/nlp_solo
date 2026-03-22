import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ComplaintsPraises({ content }) {
  if (!content) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
      {/* Top Praises */}
      <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 border-b border-emerald-50 pb-4">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                <ThumbsUp size={18} />
            </div>
          <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Top Praises</h3>
        </div>
        <ul className="space-y-3 flex-grow">
          {content.top_praises.map((praise, idx) => (
            <li key={idx} className="flex items-start gap-4 bg-emerald-50/50 px-4 py-4 rounded-xl border border-emerald-50 shadow-sm">
              <span className="text-emerald-500 text-xs font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm flex-shrink-0 mt-0.5">{idx + 1}</span>
              <span className="text-emerald-900 text-sm font-medium leading-relaxed">{praise}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Complaints */}
      <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 border-b border-rose-50 pb-4">
            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg">
                <ThumbsDown size={18} />
            </div>
          <h3 className="text-sm font-bold text-rose-800 uppercase tracking-widest">Top Complaints</h3>
        </div>
        <ul className="space-y-3 flex-grow">
          {content.top_complaints.map((complaint, idx) => (
            <li key={idx} className="flex items-start gap-4 bg-rose-50/50 px-4 py-4 rounded-xl border border-rose-50 shadow-sm">
              <span className="text-rose-500 text-xs font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm flex-shrink-0 mt-0.5">{idx + 1}</span>
              <span className="text-rose-900 text-sm font-medium leading-relaxed">{complaint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
