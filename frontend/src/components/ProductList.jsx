import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

export default function ProductList({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Top Google Shopping Matches</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {p.thumbnail && (
                <div className="w-full h-32 bg-slate-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  <img src={p.thumbnail} alt={p.title} className="max-h-full object-cover mix-blend-multiply" />
                </div>
              )}
              <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">{p.title}</h4>
            </div>
            
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-50">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star size={14} fill="currentColor" />
                <span>{p.rating || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <MessageCircle size={14} />
                <span>{(p.reviews || 0).toLocaleString()} reviews</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
