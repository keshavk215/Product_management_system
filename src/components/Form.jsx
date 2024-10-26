import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

const ProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, product);
    setProduct({ name: '', description: '', price: '', quantity: '' });
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={product.name} onChange={handleChange} />
      <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" value={product.quantity} onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
