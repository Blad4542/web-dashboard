import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Sale, SalesContextType } from "../types";

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //States for sales data, loading, error, and filters
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    product?: string;
    region?: string;
    date?: string;
  }>({});
  //Function to load data from API
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/API/SalesData.json");
      if (!response.ok) {
        throw new Error("Error, please check API endpoint.");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setSalesData(jsonData.sales);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch data:", err.message);
        setError("Failed to fetch data: " + err.message);
      } else {
        console.error("Failed to fetch data");
        setError("Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  }, []);
  //Function to update filters
  const updateFilters = useCallback(
    (filterType: string, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    []
  );
  //Return the provider with the values
  return (
    <SalesContext.Provider
      value={{ salesData, loading, error, loadData, filters, updateFilters }}
    >
      {children}
    </SalesContext.Provider>
  );
};
//Function to use the context
export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};
