// src/components/ProductList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";
interface ProductListProps {
  products?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { products: contextProducts } = useProduct();
  const navigate = useNavigate();

  const productsToRender = products ?? contextProducts;

  const handleBuyNow = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  if (!productsToRender.length) {
    return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {productsToRender.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={handleBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductList;
