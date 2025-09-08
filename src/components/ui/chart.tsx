"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProgressChartProps {
  data: any[];
  type?: "bar" | "pie";
  className?: string;
}

const COLORS = ["#f4c430", "#d4af37", "#b8860b", "#9a7c0a", "#7b6508"];

export function ProgressChart({ data, type = "bar", className }: ProgressChartProps) {
  if (type === "pie") {
    return (
      <div className={className}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
            tickLine={{ stroke: '#404040' }}
          />
          <YAxis 
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
            tickLine={{ stroke: '#404040' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '8px',
              color: '#f4f3f0'
            }}
          />
          <Bar dataKey="value" fill="#f4c430" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}