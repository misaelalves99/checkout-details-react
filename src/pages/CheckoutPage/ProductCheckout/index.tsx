// src/pages/CheckoutPage/ProductCheckout/index.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../../types/product';
import { getProductById } from '../../../lib/api/products';
import styles from './CheckoutPage.module.css';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

const mockShippingOptions: ShippingOption[] = [
  { id: 'normal', name: 'Normal', price: 0, deliveryTime: '15 de maio, quinta' },
  { id: 'rapido', name: 'Retirar Rápido', price: 0, deliveryTime: 'Retirar em 2h' },
];

const mockAddress = {
  isPrincipal: true,
  name: 'Misael Alves dos Santos',
  street: 'Rua Francisco De Souza Campos, 131 - casa',
  cityState: 'Rio Pretinho, Teófilo Otoni - MG',
  cep: '39808-000',
};

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(mockShippingOptions[0]);

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error('ID de produto inválido:', id);
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getProductById(numericId);
        if (!data) {
          console.warn(`Produto com ID ${numericId} não encontrado.`);
        }
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);


  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prev) =>
      type === 'increment' ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  const calculateTotal = () => {
    return product ? product.price * quantity + selectedShipping.price : 0;
  };

  const handleGoToPayment = () => {
    alert('Ir para a página de pagamento (funcionalidade não implementada).');
    console.log('Produto:', product);
    console.log('Quantidade:', quantity);
    console.log('Opção de frete:', selectedShipping);
  };

  if (!product) {
    return <div className={styles.notFound}>Produto não encontrado.</div>;
  }

  const total = calculateTotal();
  const pixDiscount = total * 0.05;
  const totalPix = total - pixDiscount;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutPanel}>
        <section className={styles.deliveryAddress}>
          <h2>Endereço de entrega</h2>
          <div className={styles.addressCard}>
            {mockAddress.isPrincipal && (
              <span className={styles.principalAddress}>Endereço principal</span>
            )}
            <p>{mockAddress.name}</p>
            <p>{mockAddress.street}</p>
            <p>{mockAddress.cityState}</p>
            <p>CEP: {mockAddress.cep}</p>
            <button className={styles.changeAddressButton}>Novo endereço</button>
            <button className={styles.changeAddressButton}>Escolher outro endereço</button>
          </div>
        </section>

        <section className={styles.shippingOptions}>
          <h2>Escolha a entrega</h2>
          {mockShippingOptions.map((option) => (
            <div
              key={option.id}
              className={`${styles.shippingOption} ${
                selectedShipping.id === option.id ? styles.selected : ''
              }`}
              onClick={() => handleShippingSelect(option)}
            >
              <input
                type="radio"
                id={option.id}
                name="shipping"
                value={option.id}
                checked={selectedShipping.id === option.id}
                onChange={() => handleShippingSelect(option)}
              />
              <label htmlFor={option.id}>
                <span className={styles.shippingName}>{option.name}</span>
                <span className={styles.deliveryTime}>{option.deliveryTime}</span>
                <span className={styles.shippingPrice}>
                  {option.price > 0 ? `R$ ${option.price.toFixed(2)}` : 'Grátis'}
                </span>
              </label>
            </div>
          ))}
        </section>

        <section className={styles.checkoutFormSection}>
          <h2>Dados para entrega (opcional)</h2>
        </section>
      </div>

      <div className={styles.orderSummary}>
        <h2>Resumo do pedido</h2>
        <div className={styles.summaryItem}>
          <div className={styles.productInfo}>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className={styles.summaryImage}
              />
            )}
            <p className={styles.summaryProductName}>{product.name}</p>
          </div>
          <div className={styles.quantityControl}>
            <button onClick={() => handleQuantityChange('decrement')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')}>+</button>
          </div>
        </div>

        <div className={styles.summarySubtotal}>
          <span>Subtotal ({quantity} Produto{quantity > 1 ? 's' : ''})</span>
          <span>R$ {(product.price * quantity).toFixed(2)}</span>
        </div>
        <div className={styles.summaryShipping}>
          <span>Entrega</span>
          <span>
            {selectedShipping.price > 0
              ? `R$ ${selectedShipping.price.toFixed(2)}`
              : 'Grátis'}
          </span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className={styles.paymentInfo}>
          <p>ou R$ {totalPix.toFixed(2)} à vista no Pix</p>
        </div>

        <button className={styles.goToPaymentButton} onClick={handleGoToPayment}>
          Ir para pagamento
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
