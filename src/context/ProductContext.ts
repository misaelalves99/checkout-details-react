// app/context/ProductContext.ts

import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { Product } from "../types/product";

export type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
