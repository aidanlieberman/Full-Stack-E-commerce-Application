import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5002/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, price: parseFloat(price) }),
    })
      .then(response => response.json())
      .then(product => {
        onAddProduct(product);
        setTitle('');
        setPrice('');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
