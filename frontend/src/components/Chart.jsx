import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = {
  Positive: '#10b981', // emerald-500
  Neutral: '#f59e0b', // amber-500
  Negative: '#f43f5e', // rose-500
};

export default function Chart({ aspects }) {
  const chartData = useMemo(() => {
    if (!aspects || aspects.length === 0) return [];
    
    let pos = 0, neg = 0, neu = 0;
    aspects.forEach(a => {
      const s = a.sentiment.toLowerCase();
      if (s === 'positive') pos++;
      else if (s === 'negative') neg++;
      else neu++;
    });

    const data = [];
    if (pos > 0) data.push({ name: 'Positive', value: pos });
    if (neu > 0) data.push({ name: 'Neutral', value: neu });
    if (neg > 0) data.push({ name: 'Negative', value: neg });
    return data;
  }, [aspects]);

  if (chartData.length === 0) return null;

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Neutral} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: '1px solid #f1f5f9', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              fontWeight: 600,
              color: '#334155'
            }}
            itemStyle={{ color: '#64748b', fontWeight: 500 }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
