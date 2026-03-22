import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-br from-teal-500 to-emerald-600 px-8 py-10 rounded-2xl shadow-lg border border-teal-400/50 text-white relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <Sparkles size={180} />
      </div>
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-2 mb-6 opacity-90">
          <Sparkles fill="currentColor" size={20} />
          <p className="text-sm font-bold tracking-widest uppercase">Executive AI Summary</p>
        </div>
        <p className="text-2xl md:text-3xl font-semibold leading-tight drop-shadow-sm">
          "{summary}"
        </p>
      </div>
    </div>
  );
}
