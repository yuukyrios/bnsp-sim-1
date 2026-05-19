import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./hooks/useProducts";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import "./styles/global.css";

export default function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index      element={<Dashboard />} />
            <Route path="products"  element={<Products />} />
            <Route path="orders"    element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings"  element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}
