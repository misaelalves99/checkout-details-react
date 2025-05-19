// src/components/ProductCard.tsx

import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favoriteIcon}>
        <FaHeart size={18} color="#ff4d4f" title="Adicionar aos favoritos" />
      </div>

      <div
        className={styles.imageWrapper}
        onClick={goToProduct}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.imageUrl || "/images/product-placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className={styles.productImage}
        />
      </div>

      <div className={styles.details}>
        <h3
          className={styles.productName}
          onClick={goToProduct}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.cartButton}
            title="Adicionar ao carrinho"
          >
            <FaCartPlus size={20} />
          </button>
          <button
            className={styles.buyButton}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
