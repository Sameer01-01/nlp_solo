import React from 'react';
import { Users, TrendingUp, ShieldCheck, Star } from 'lucide-react';

export default function KPISection({ data }) {
  if (!data) return null;

  const kpis = [
    { label: "Analyzed Reviews", value: data.total_reviews, icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Satisfaction Score", value: `${data.satisfaction_score}%`, icon: <TrendingUp size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "AI Confidence", value: `${data.confidence}%`, icon: <ShieldCheck size={20} />, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Google Rating", value: data.average_rating ? `${data.average_rating} / 5` : "N/A", icon: <Star size={20} />, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
            {kpi.icon}
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
            <p className="text-xl md:text-2xl font-extrabold text-slate-800">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
