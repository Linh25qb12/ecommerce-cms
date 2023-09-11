"use client"

import { Empty } from "antd";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
  data: any[]
  totalRevenue: any,
};

export const Overview: React.FC<OverviewProps> = ({
  data,
  totalRevenue
}) => {

  return (
    <ResponsiveContainer width="100%" height={400}>
      {totalRevenue > 0
        ? <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
        </BarChart>
        : <Empty description='No product sold' />}
    </ResponsiveContainer>
  )
};