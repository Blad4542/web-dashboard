// src/components/SalesByDayChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSales } from "../../context/SalesContext";

const SalesByDayChart: React.FC = () => {
  const { salesData, filters } = useSales();
  //Filters the data based on the selected filters
  const filteredData = salesData.filter((sale) => {
    return (
      (!filters.product || sale.product === filters.product) &&
      (!filters.region || sale.region === filters.region) &&
      (!filters.date || sale.date === filters.date)
    );
  });

  // Prepare the data for the chart
  const data = filteredData.reduce((acc, item) => {
    const date = item.date;
    acc[date] = acc[date] || { date, sales: 0 };
    acc[date].sales += item.sales;
    return acc;
  }, {} as Record<string, { date: string; sales: number }>);

  const dataArray = Object.values(data);
  //Return the chart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesByDayChart;
