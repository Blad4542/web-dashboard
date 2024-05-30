import React from "react";
import { useSales } from "../context/SalesContext";

const Filters: React.FC = () => {
  const { updateFilters, salesData } = useSales();
  //Create a set of unique products, regions, and dates
  const products = Array.from(new Set(salesData.map((s) => s.product)));
  const regions = Array.from(new Set(salesData.map((s) => s.region)));
  const dates = Array.from(new Set(salesData.map((s) => s.date)));

  return (
    <div>
      <div>
        <label htmlFor="product-filter">Product:</label>
        <select
          id="product-filter"
          onChange={(e) => updateFilters("product", e.target.value)}
        >
          <option value="">All Products</option>
          {products.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="region-filter">Region:</label>
        <select
          id="region-filter"
          onChange={(e) => updateFilters("region", e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date-filter">Date:</label>
        <select
          id="date-filter"
          onChange={(e) => updateFilters("date", e.target.value)}
        >
          <option value="">All Dates</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
