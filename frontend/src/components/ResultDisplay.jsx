import React from 'react';
import AspectList from './AspectList';
import Chart from './Chart';
import SentimentBadge from './SentimentBadge';
import { Sparkles, BarChart2 } from 'lucide-react';

export default function ResultDisplay({ result }) {
  if (!result) return null;

  const { overall_sentiment, aspects, summary } = result;

  return (
    <div className="w-full space-y-6">
      
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Overall Sentiment Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between items-start">
          <p className="text-sm font-semibold text-slate-500 mb-3 tracking-wide uppercase">Overall View</p>
          <div className="mt-auto">
            <SentimentBadge sentiment={overall_sentiment} size="lg" />
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-2xl shadow-md text-white">
          <div className="flex items-center gap-2 mb-3 text-teal-100">
            <Sparkles size={18} />
            <p className="text-xs font-bold tracking-wide uppercase">AI Summary</p>
          </div>
          <p className="text-lg font-medium leading-snug drop-shadow-sm">"{summary}"</p>
        </div>
      </div>

      {/* Aspects Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="p-2 bg-slate-50 rounded-lg">
            <BarChart2 className="text-slate-500" size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Aspect Breakdown</h2>
        </div>

        {aspects && aspects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            <div className="w-full max-h-64 overflow-y-auto pr-3 custom-scrollbar">
              <AspectList aspects={aspects} />
            </div>
            <div className="w-full flex justify-center h-full min-h-[220px]">
              <Chart aspects={aspects} />
            </div>
          </div>
        ) : (
          <div className="py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
            <p className="text-slate-500 font-medium">No specific aspects extracted from this review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
