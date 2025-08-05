import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`Product with id: ${id} deleted successfully.`);
        setProducts(products.filter(product => product._id !== id));
      } else {
        console.error(`Failed to delete product with id: ${id}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.title} - ${product.price}
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
