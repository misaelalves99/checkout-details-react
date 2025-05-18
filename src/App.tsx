// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'; // Corrigido
import ProductPage from './pages/ProductsPage/ProductPage'; // Corrigido
import CheckoutPage from './pages/CheckoutPage/ProductCheckout'; // Corrigido
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <ProductProvider>
          <div className="app-layout">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} /> {/* Lista */}
                <Route path="/products/:id" element={<ProductPage />} /> {/* Detalhe */}
                <Route path="/checkout/:id" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
