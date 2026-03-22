import React from 'react';
import SentimentBadge from './SentimentBadge';

export default function AspectTable({ aspects }) {
  if (!aspects || aspects.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">Aspect-Based Sentiment</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold">Key Aspect</th>
              <th className="px-6 py-4 font-bold">Dominant Sentiment</th>
              <th className="px-6 py-4 font-bold text-right">Mention Frequency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {aspects.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold capitalize text-slate-800">{item.aspect}</td>
                <td className="px-6 py-4"><SentimentBadge sentiment={item.sentiment} size="sm" /></td>
                <td className="px-6 py-4 text-right font-medium">
                   <span className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest ${item.frequency === 'High' ? 'bg-indigo-50 text-indigo-600' : item.frequency === 'Medium' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      {item.frequency}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
