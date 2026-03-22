import React, { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';

export default function ProductSearch({ onSearch, isLoading, error }) {
  const [query, setQuery] = useState('');

  const samples = ["hair dryer", "gaming laptop", "running shoes"];

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <label htmlFor="productSearch" className="text-sm font-semibold text-slate-700">Search Product</label>
        <div className="flex gap-2">
          {samples.map((s) => (
            <button 
              key={s}
              onClick={() => setQuery(s)}
              className="text-[10px] md:text-xs bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 font-medium px-2 py-1 rounded transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          id="productSearch"
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-700 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50 focus:outline-none transition-all duration-200"
          placeholder="e.g. hair dryer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        />
      </div>

      {error && (
        <p className="text-rose-500 text-sm font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>
      )}

      <button
        disabled={isLoading || !query.trim()}
        onClick={() => onSearch(query)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        <ShoppingBag size={18} />
        {isLoading ? 'Aggregating Intelligence...' : 'Analyze Market Intelligence'}
      </button>
    </div>
  );
}
