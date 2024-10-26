import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './Item';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/products';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const response = await axios.get(API_URL);
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    loadProducts();
  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  } 

  return (
    <div>
      
      <h2 style={{display:"flex", justifyContent:"center"}}>Product List</h2>
      <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} onEdit={() => handleEdit(product.id)} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
