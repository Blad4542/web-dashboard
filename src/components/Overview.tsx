import React from "react";
import { useSales } from "../context/SalesContext";

const Overview: React.FC = () => {
  const { salesData, loading, error } = useSales();
  //Loading and error handling
  if (loading) return <p>Loading data</p>;
  if (error) return <p>Error: {error}</p>;
  //Calculating total sales, total products sold, and sales per day
  const totalSales = salesData.reduce((acc, sale) => acc + sale.sales, 0);
  const totalProducts = salesData.length;
  const salesPerDay = salesData.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.sales;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Sales Overview</h1>
      <p className="font-medium text-gray-600">
        Total Sales:
        <span className="text-gray-800">${totalSales.toFixed(2)}</span>
      </p>
      <p className="font-medium text-gray-600">
        Total Products Sold:
        <span className="text-gray-800">{totalProducts}</span>
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">Sales Per Day:</h2>
        <ul className="list-disc list-inside">
          {Object.entries(salesPerDay).map(([date, total]) => (
            <li key={date} className="font-medium text-gray-600">
              {date}: <span className="text-gray-800">${total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
