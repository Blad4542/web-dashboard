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

  // Filters the sales data according to user-selected product, region, and date.
  // If no filter is selected for a category, it includes all data from that category.
  const filteredData = salesData.filter((sale) => {
    return (
      (!filters.product || sale.product === filters.product) &&
      (!filters.region || sale.region === filters.region) &&
      (!filters.date || sale.date === filters.date)
    );
  });

  // Aggregates sales data by date. For each date, it accumulates total sales
  // into a single object with properties for date and sales.
  const data = filteredData.reduce((acc, item) => {
    const date = item.date;
    // Initializes the accumulator for each date if it does not already exist.
    acc[date] = acc[date] || { date, sales: 0 };
    // Adds the current item's sales to the total sales for the date.
    acc[date].sales += item.sales;
    return acc;
  }, {} as Record<string, { date: string; sales: number }>);

  // Converts the accumulated data from an object into an array for use in the BarChart.
  const dataArray = Object.values(data);

  // Renders the BarChart inside a ResponsiveContainer to ensure it adapts to its parent's size.
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
