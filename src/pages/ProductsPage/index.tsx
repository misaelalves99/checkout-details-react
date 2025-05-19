// src/pages/ProductsPage/index.tsx

import React, { useEffect, useState } from 'react';
import { getProducts } from '../../lib/api/products';
import ProductList from '../../components/ProductList';
import styles from './ProductsPage.module.css';
import { useProduct } from '../../context/ProductContext';

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setProducts } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError('Erro ao carregar produtos.');
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
