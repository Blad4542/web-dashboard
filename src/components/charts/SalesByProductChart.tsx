import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSales } from "../../context/SalesContext";

const SalesByProductChart: React.FC = () => {
  const { salesData, filters } = useSales();

  //Filters the data based on the selected filters
  const filteredData = salesData.filter((sale) => {
    return (
      (!filters.product || sale.product === filters.product) &&
      (!filters.region || sale.region === filters.region) &&
      (!filters.date || sale.date === filters.date)
    );
  });

  // Create an array of unique dates
  const uniqueDates = Array.from(
    new Set(filteredData.map((sale) => sale.date))
  ).sort();

  // Prepare the data for the chart
  const dataByDate = uniqueDates.map((date) => ({
    date,
    ...filteredData
      .filter((sale) => sale.date === date)
      .reduce<{ [key: string]: number }>(
        (acc, curr) => ({
          ...acc,
          [`${curr.product} - ${curr.region}`]:
            (acc[`${curr.product} - ${curr.region}`] || 0) + curr.sales,
        }),
        {}
      ),
  }));
  //Return the chart
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={dataByDate}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(dataByDate[0])
          .filter((key) => key !== "date")
          .map((key, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={["#8884d8", "#82ca9d", "#ffc658"][index % 3]}
              fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]}
            />
          ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesByProductChart;
