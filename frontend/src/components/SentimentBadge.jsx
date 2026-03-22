import React from 'react';

export default function SentimentBadge({ sentiment, size = 'md' }) {
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let indicatorColor = 'bg-slate-400';
  
  if (sentiment.toLowerCase() === 'positive') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-100';
    indicatorColor = 'bg-emerald-500';
  } else if (sentiment.toLowerCase() === 'negative') {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-100';
    indicatorColor = 'bg-rose-500';
  } else if (sentiment.toLowerCase() === 'neutral') {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-100';
    indicatorColor = 'bg-amber-500';
  }

  const pSize = size === 'lg' ? 'px-4 py-2 font-bold text-lg shadow-sm' : 'px-3 py-1 text-xs font-bold';
  const dotSize = size === 'lg' ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border ${colorClass} ${pSize} tracking-wide`}>
      <span className={`${indicatorColor} ${dotSize} rounded-full`}></span>
      {sentiment}
    </span>
  );
}
