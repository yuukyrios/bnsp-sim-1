import { createContext, useContext, useState } from "react";
import { PRODUCTS } from "../data/products";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);

  const addProduct = (p) =>
    setProducts((prev) => [...prev, { ...p, id: Date.now(), image: "📦" }]);

  const updateProduct = (updated) =>
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
