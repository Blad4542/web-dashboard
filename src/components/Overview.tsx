import React from "react";
import { useSales } from "../context/SalesContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const Overview: React.FC = () => {
  const { salesData, loading, error } = useSales();

  // Handle loading and error states
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate total sales and total products sold
  const totalSales = salesData.reduce((acc, sale) => acc + sale.sales, 0);
  const totalProducts = salesData.length;

  // Aggregate sales per day
  const salesPerDay = salesData.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.sales;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the PieChart
  const pieData = Object.entries(salesPerDay).map(([date, total]) => ({
    name: date,
    value: total,
  }));

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Sales Overview</h1>
      <p className="font-medium text-gray-600">
        Total Sales:{" "}
        <span className="text-gray-800">${totalSales.toFixed(2)}</span>
      </p>
      <p className="font-medium text-gray-600">
        Total Products Sold:{" "}
        <span className="text-gray-800">{totalProducts}</span>
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">Sales Per Day:</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
