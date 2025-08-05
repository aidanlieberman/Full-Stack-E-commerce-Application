import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  // Fetch initial product list on mount
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Add new product to the current list
  const addProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  return (
    <div className="App">
      <h1>Simple E-commerce Store</h1>
      <ProductForm onAddProduct={addProduct} />
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

export default App;
