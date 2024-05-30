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

  // Filters the data based on the selected product, region, and date filters.
  // It checks if the product, region, or date from the sale matches the filter selected.
  // If no filter is selected for that category, it includes all data from that category.
  const filteredData = salesData.filter((sale) => {
    return (
      (!filters.product || sale.product === filters.product) &&
      (!filters.region || sale.region === filters.region) &&
      (!filters.date || sale.date === filters.date)
    );
  });

  // Creates an array of unique dates from the filtered data for the x-axis of the chart.
  // Uses a Set to ensure dates are not duplicated then converts the set back to an array.
  const uniqueDates = Array.from(
    new Set(filteredData.map((sale) => sale.date))
  ).sort();

  // Prepares the data structure for the chart. Maps over each unique date and creates an
  // object that includes the date and a dynamically generated series of key-value pairs.
  // Each key is a combination of product and region, and each value is the total sales for that date.
  const dataByDate = uniqueDates.map((date) => ({
    date,
    ...filteredData
      .filter((sale) => sale.date === date)
      .reduce<{ [key: string]: number }>(
        (acc, curr) => ({
          // Accumulates sales totals for each product-region combination.
          ...acc,
          [`${curr.product} - ${curr.region}`]:
            (acc[`${curr.product} - ${curr.region}`] || 0) + curr.sales,
        }),
        {}
      ),
  }));

  // Renders the AreaChart using a ResponsiveContainer to ensure it scales nicely with the screen size.
  // The AreaChart contains multiple Area components, one for each product-region combination,
  // stacked on top of each other to show the contribution of each product-region to the total sales.
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
