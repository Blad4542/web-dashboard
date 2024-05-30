import "./App.css";
import { SalesProvider } from "./context/SalesContext";
import SalesDashboard from "./components/SalesDashboard";

function App() {
  return (
    //context applied to the SalesDashboard component
    <SalesProvider>
      <div className="App">
        <SalesDashboard />
      </div>
    </SalesProvider>
  );
}

export default App;
