// src/components/ProductDetails/ProductDetails.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import styles from './ProductDetails.module.css';
import { Product } from '../types/product';

export interface ProductDetailsProps {
  product: Product;
  isFavorite: boolean;
  toggleFavorite: () => void;
  mainImage: string;
  thumbnails: string[];
  onThumbnailClick: (imageUrl: string) => void;
  onShare: () => void;
  formatPrice: (price?: number) => string | undefined;
  onBuyNow: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isFavorite,
  toggleFavorite,
  mainImage,
  thumbnails,
  onThumbnailClick,
  onShare,
  formatPrice,
}) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (product?.id) {
      navigate(`/checkout/${product.id}`);
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageGallery}>
        <div className={styles.mainImageWrapper}>
          <img
            src={mainImage}
            alt={product.name}
            width={500}
            height={500}
            className={styles.productImage}
          />
          <div className={styles.imageActions}>
            <button
              className={styles.favoriteButton}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {isFavorite ? (
                <AiFillHeart color="red" size={24} />
              ) : (
                <AiOutlineHeart color="grey" size={24} />
              )}
            </button>
            <button
              className={styles.shareButton}
              onClick={onShare}
              aria-label="Compartilhar"
            >
              <AiOutlineShareAlt size={24} />
            </button>
          </div>
        </div>

        <div className={styles.thumbnails}>
          {thumbnails.map((img, index) => (
            <div
              key={index}
              className={`${styles.thumbnailWrapper} ${
                mainImage === img ? styles.activeThumbnail : ''
              }`}
              onClick={() => onThumbnailClick(img)}
            >
              <img
                src={img}
                alt={`Miniatura ${index + 1}`}
                width={80}
                height={80}
                className={styles.thumbnailImage}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <h1 className={styles.productName}>{product.name}</h1>

        <div className={styles.ratingAndReviews}>
          <div className={styles.rating}>
            {[...Array(4)].map((_, i) => (
              <AiFillStar key={i} color="#ffc107" size={16} />
            ))}
            <AiFillStar color="grey" size={16} />
            <span className={styles.ratingValue}>4.0</span>
          </div>
          <span className={styles.reviewCount}>(15 avaliações)</span>
        </div>

        {product.oldPrice && (
          <p className={styles.oldPrice}>{formatPrice(product.oldPrice)}</p>
        )}

        <p className={styles.productPrice}>{formatPrice(product.price)}</p>

        <div className={styles.discount}>
          <span className={styles.discountPercentage}>13% OFF</span>
        </div>

        <div className={styles.paymentOptions}>
          <span>Ver mais opções de pagamento</span>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.buyButton} onClick={handleBuyNow}>
            Comprar
          </button>
        </div>

        <div className={styles.shippingCalculator}>
          <label htmlFor="cep" className={styles.shippingLabel}>
            Calcular frete e prazo de entrega:
          </label>
          <div className={styles.shippingInput}>
            <input
              type="text"
              id="cep"
              placeholder="Digite seu CEP"
              className={styles.cepInput}
            />
            <button className={styles.calculateButton}>Calcular</button>
          </div>
        </div>

        <div className={styles.productFeatures}>
          <span className={styles.viewFeatures}>Ver características do produto</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
