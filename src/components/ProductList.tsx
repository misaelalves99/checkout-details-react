// src/components/ProductList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";
import { CartItem } from "../types/cart";

interface ProductListProps {
  products?: Product[]; // prop opcional
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { products: contextProducts } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productsToRender = products ?? contextProducts;

  const handleBuyNow = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product,
      category: product.category,
    };
    addToCart(cartItem);
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
