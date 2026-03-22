import React from 'react';
import SentimentBadge from './SentimentBadge';

export default function AspectList({ aspects }) {
  return (
    <ul className="space-y-3">
      {aspects.map((item, idx) => (
        <li 
          key={idx} 
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
        >
          <span className="font-semibold text-slate-700 capitalize text-sm">{item.aspect}</span>
          <SentimentBadge sentiment={item.sentiment} size="sm" />
        </li>
      ))}
    </ul>
  );
}
