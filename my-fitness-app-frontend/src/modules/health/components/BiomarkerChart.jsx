import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const BiomarkerChart = ({ title, data, dataKey, color = '#4F46E5', unit = '' }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <h4 className="text-base font-semibold text-gray-800 mb-4">{title}</h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} unit={unit} />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E5E7EB' }}
            />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};