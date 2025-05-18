// src/components/ProductCard.tsx

import React, { useContext } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Corrigido aqui
import { CartContext } from "../context/CartContext";
import { Product } from "../types/product";
import { CartItem } from "../types/cart";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate(); // useNavigate no lugar de useHistory

  if (!cartContext) throw new Error("CartContext não encontrado");
  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product: product,
    };
    addToCart(cartItem);
  };

  const goToProduct = () => {
    navigate(`/products/${product.id}`); // use navigate para navegar
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
            onClick={handleAddToCart}
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
