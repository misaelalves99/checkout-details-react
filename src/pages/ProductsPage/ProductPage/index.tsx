// src/pages/ProductsPage/ProductPage/index.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { Product } from '../../../types/product';
import { getProductById } from '../../../lib/api/products';
import ProductDetails from '../../../components/ProductDetails';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        console.warn('Nenhum ID foi fornecido');
        setError('ID inválido');
        setLoading(false);
        return;
      }

      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        console.warn('ID de produto não é um número:', id);
        setError('ID inválido');
        setLoading(false);
        return;
      }

      try {
        const fetchedProduct = await getProductById(numericId);
        if (!fetchedProduct) throw new Error('Produto não encontrado');
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.imageUrl || '');
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o produto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/checkout/${product?.id}`);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const handleShare = () => console.log('Compartilhar produto');
  const handleThumbnailClick = (imageUrl: string) => setMainImage(imageUrl);

  const formatPrice = (price?: number): string | undefined => {
    if (price === undefined) return undefined;
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) return <div className={styles.loading}>Carregando produto...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Produto não encontrado.</div>;

  const thumbnails = product.images?.length ? product.images : [product.imageUrl];

  return (
    <div className={styles.container}>
      <ProductDetails
        product={product}
        onBuyNow={handleBuyNow}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        mainImage={mainImage}
        thumbnails={thumbnails.filter((img): img is string => typeof img === 'string')}
        onThumbnailClick={handleThumbnailClick}
        onShare={handleShare}
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default ProductPage;
