import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PerformanceData } from '../types';

interface NetWorthChartProps {
  data: PerformanceData[];
}

const NetWorthChart: React.FC<NetWorthChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5d9632" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#5d9632" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#5d9632" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: '#374151' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetWorthChart;