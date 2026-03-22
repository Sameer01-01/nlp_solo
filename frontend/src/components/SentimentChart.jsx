import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = {
  positive: '#10b981', // emerald-500
  neutral: '#f59e0b', // amber-500
  negative: '#f43f5e', // rose-500
};

export default function SentimentChart({ data }) {
  if (!data) return null;
  
  const chartData = [
    { name: 'Positive', value: data.positive || 0, key: 'positive' },
    { name: 'Neutral', value: data.neutral || 0, key: 'neutral' },
    { name: 'Negative', value: data.negative || 0, key: 'negative' },
  ].filter(d => d.value > 0);

  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.key]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle"/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
