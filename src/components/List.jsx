import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './Item';
import { useNavigate } from 'react-router-dom';
import "./List.css";
import { useAuth } from '../AuthContext';

const API_URL = 'https://product-management-system-bgls.onrender.com/api/products';

const ProductList = ({products,loading}) => {

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleDelete = async (id) => {
    if (!token) {
      window.alert('User not authenticated. Go to login page');
      navigate('/login'); 
      return;
  }
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    window.alert('Product deleted successfully!');
    window.location.reload();
}
  catch (error) {
    console.error('Error deleting product:', error);
    window.alert('An error occurred. Please try again later.');
  }   
  };
  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  } 

  return (
    <div className={`product-list ${!loading ? 'background-loaded' : ''}`}>
      {loading ? (
        <p className="header-before">Loading products...</p>
      ) : (
        <>
      <h2 className="header">List of Products</h2>
      <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} onEdit={() => handleEdit(product.id)} />
        ))}
      </div>
      </>
      )}
    </div>
  );
};

export default ProductList;
