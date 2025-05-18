// app/api/cart/cartService.ts

import type { Cart, CartItem } from '@/app/types/cart';

// Carrinho simulado em memória
let cart: Cart = { items: [], total: 0 };

// Serviço para buscar o carrinho
export function getCart(): Cart {
  return cart;
}

// Serviço para adicionar item ao carrinho
export function addToCart(item: CartItem): Cart {
  const existingItem = cart.items.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push({ ...item });
  }

  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço para atualizar item no carrinho (quantidade e preço)
export function updateCart(updatedItem: CartItem): Cart {
  cart.items = cart.items.map((item) =>
    item.id === updatedItem.id ? { ...item, ...updatedItem } : item
  );

  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço para remover item do carrinho
export function removeFromCart(productId: number): Cart {
  cart.items = cart.items.filter((item) => item.id !== productId);
  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço para limpar o carrinho
export function clearCart(): void {
  cart = { items: [], total: 0 };
}

// 01-Estruturas e Tratamento -
// 03-Arrays -
// 08-Api -
