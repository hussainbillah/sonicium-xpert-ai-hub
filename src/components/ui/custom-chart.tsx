
import React from 'react';
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, 
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Line Chart Component
export const LineChart = ({ 
  data, 
  lines = [], 
  xAxisDataKey = 'name', 
  grid = true, 
  height = "100%", 
  className = "" 
}: {
  data: any[];
  lines: {
    dataKey: string;
    stroke?: string;
    name?: string;
    strokeWidth?: number;
    type?: 'monotone' | 'linear' | 'basis' | 'natural';
  }[];
  xAxisDataKey?: string;
  grid?: boolean;
  height?: number | string;
  className?: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line 
            key={index}
            type={line.type || 'monotone'} 
            dataKey={line.dataKey} 
            name={line.name || line.dataKey} 
            stroke={line.stroke || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            strokeWidth={line.strokeWidth || 2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Bar Chart Component
export const BarChart = ({ 
  data, 
  bars = [],
  xAxisDataKey = 'name',
  grid = true,
  height = "100%", 
  className = "",
  stacked = false
}: {
  data: any[];
  bars: {
    dataKey: string;
    fill?: string;
    name?: string;
    stackId?: string;
  }[];
  xAxisDataKey?: string;
  grid?: boolean;
  height?: number | string;
  className?: string;
  stacked?: boolean;
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar 
            key={index}
            dataKey={bar.dataKey} 
            name={bar.name || bar.dataKey} 
            fill={bar.fill || `#${Math.floor(Math.random()*16777215).toString(16)}`}
            stackId={stacked ? (bar.stackId || 'stack') : undefined}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
export const PieChart = ({
  data,
  dataKey,
  nameKey = 'name',
  colors = [],
  height = "100%",
  className = "",
  innerRadius = 0,
  outerRadius = '80%',
  label = false
}: {
  data: any[];
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  height?: number | string;
  className?: string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  label?: boolean | React.ReactElement<any> | ((props: any) => React.ReactNode);
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={label}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || colors[index % colors.length] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
