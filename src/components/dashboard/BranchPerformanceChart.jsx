import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock chart data
const data = [
  { name: 'Branch A', students: 400, teachers: 24 },
  { name: 'Branch B', students: 300, teachers: 22 },
  { name: 'Branch C', students: 200, teachers: 18 },
  { name: 'Branch D', students: 278, teachers: 20 },
  { name: 'Branch E', students: 189, teachers: 16 },
];

const BranchPerformanceChart = () => (
  <div className="w-full h-64">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="teachers" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default BranchPerformanceChart;
