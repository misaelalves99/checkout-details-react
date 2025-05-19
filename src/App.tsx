// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ProductProvider } from './context/ProductProvider';
import { CheckoutProvider } from './context/CheckoutProvider';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductsPage/ProductPage';
import CheckoutPage from './pages/CheckoutPage/ProductCheckout';

const App: React.FC = () => {
  return (
    <Router>
      <ProductProvider>
        <CheckoutProvider>
          <div className="app-layout">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/checkout/:id" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CheckoutProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;
