//type definitions for the app
export type Sale = {
  id: number;
  product: string;
  region: string;
  sales: number;
  date: string;
};

export type SalesContextType = {
  salesData: Sale[];
  loading: boolean;
  error: string | null;
  loadData: () => void;
  filters: { product?: string; region?: string; date?: string };
  updateFilters: (filterType: string, value: string | undefined) => void;
};
