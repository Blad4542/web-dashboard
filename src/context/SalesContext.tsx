import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Sale, SalesContextType } from "../types";

// Creating a context for sales data management
const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to store the list of sales data
  const [salesData, setSalesData] = useState<Sale[]>([]);
  // State to handle loading status during API calls
  const [loading, setLoading] = useState(false);
  // State to capture any errors during data fetching
  const [error, setError] = useState<string | null>(null);
  // State to manage filter settings for product, region, and date
  const [filters, setFilters] = useState<{
    product?: string;
    region?: string;
    date?: string;
  }>({});

  // Function to load sales data from an external API
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/API/SalesData.json");
      if (!response.ok) {
        throw new Error("Error, please check API endpoint."); // Throw an error if response is not OK
      }
      const jsonData = await response.json();
      setSalesData(jsonData.sales); // Update the state with the new sales data
      setError(null); // Reset error state if data fetch is successful
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch data:", err.message); // Log and set error if there's an exception
        setError("Failed to fetch data: " + err.message);
      } else {
        console.error("Failed to fetch data");
        setError("Failed to fetch data"); // Set generic error message for non-standard errors
      }
    } finally {
      setLoading(false); // Ensure loading is set to false after operation completes
    }
  }, []);

  // Function to update filter settings
  const updateFilters = useCallback(
    (filterType: string, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [filterType]: value })); // Merge new filter values with existing ones
    },
    []
  );

  // Context provider that passes all states and functions to child components
  return (
    <SalesContext.Provider
      value={{ salesData, loading, error, loadData, filters, updateFilters }}
    >
      {children} // Render children passed to this provider
    </SalesContext.Provider>
  );
};

// Custom hook to use the Sales context
export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider"); // Ensures the hook is used within a provider
  }
  return context;
};
