// src/pages/HomePage.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../../components/ProductList";
import styles from "./HomePage.module.css";
import { useProduct } from "../../context/ProductContext";

const HomePage: React.FC = () => {
  const { products, setProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
        <ProductList products={products.slice(0, 6)} />
      </section>
    </main>
  );
};

export default HomePage;
