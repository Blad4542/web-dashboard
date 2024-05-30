import React, { useEffect, Suspense } from "react";
import { useSales } from "../context/SalesContext";
import Overview from "./Overview";
import Filters from "./Filters";
const SalesCharts = React.lazy(() => import("./charts/SalesByDayChart"));
const SalesByProductChart = React.lazy(
  () => import("./charts/SalesByProductChart")
);

const SalesDashboard: React.FC = () => {
  const { loadData } = useSales();
  // Load data when the component mounts
  useEffect(() => {
    loadData();
  }, [loadData]);
  //Loads the components Overview, Filters, SalesCharts, and SalesByProductChart, applied lazy loading to the SalesCharts and SalesByProductChart components
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Overview />
      <Filters />
      <Suspense fallback={<div>Loading Charts...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 shadow rounded-lg bg-white">
            <SalesCharts />
          </div>
          <div className="col-span-1 md:col-span-2 p-4 shadow rounded-lg bg-white">
            <SalesByProductChart />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default SalesDashboard;
