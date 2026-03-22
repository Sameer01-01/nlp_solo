import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightBox({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-sm">
            <Lightbulb size={20} />
        </div>
        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest">AI Insights</h3>
      </div>
      <ul className="space-y-4">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
            <span className="text-indigo-900/80 font-medium leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
