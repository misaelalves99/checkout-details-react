// app/api/cart/route.ts

import { NextResponse } from 'next/server';
import type { Cart, CartItem } from '@/app/types/cart';

// Carrinho simulado em memória
let cart: Cart = { items: [], total: 0 };

// Serviço interno: busca o carrinho
function getCart(): Cart {
  return cart;
}

// Serviço interno: adiciona item ao carrinho
function addToCart(item: CartItem): Cart {
  const existingItem = cart.items.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push({ ...item });
  }

  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço interno: atualiza item (quantidade, preço)
function updateCart(updatedItem: CartItem): Cart {
  cart.items = cart.items.map((item) =>
    item.id === updatedItem.id ? { ...item, ...updatedItem } : item
  );

  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço interno: remove item do carrinho
function removeFromCart(productId: number): Cart {
  cart.items = cart.items.filter((item) => item.id !== productId);
  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return cart;
}

// Serviço interno: limpa o carrinho
function clearCart(): void {
  cart = { items: [], total: 0 };
}

// === HANDLERS API ===

// GET - Retorna o carrinho atual
export async function GET() {
  try {
    return NextResponse.json(getCart());
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ message: 'Error fetching cart' }, { status: 500 });
  }
}

// POST - Adiciona item ao carrinho
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const updatedCart = addToCart(body);
    return NextResponse.json(updatedCart, { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ message: 'Error adding product to cart' }, { status: 500 });
  }
}

// PUT - Atualiza item no carrinho
export async function PUT(req: Request) {
  const body = await req.json();
  try {
    const updatedCart = updateCart(body);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ message: 'Error updating cart' }, { status: 500 });
  }
}

// DELETE - Remove item do carrinho
export async function DELETE(req: Request) {
  const { productId } = await req.json();
  try {
    const updatedCart = removeFromCart(productId);
    return NextResponse.json({ message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return NextResponse.json({ message: 'Error removing product from cart' }, { status: 500 });
  }
}

// 01-Estruturas e Tratamento -
// 03-Arrays -
// 08-Api -