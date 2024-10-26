import React, { useState,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/products';

const ProductUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, );
        setProduct(response.data); 
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`${API_URL}/${id}`, product);
        navigate('/'); 
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              placeholder={product.name} 
              required 
            />
          </Form.Group>
          
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              placeholder={product.description } 
            />
          </Form.Group>
          
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={product.price} 
              onChange={handleChange} 
              placeholder={product.price } 
              required 
            />
          </Form.Group>
          
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="number" 
              name="quantity" 
              value={product.quantity} 
              onChange={handleChange} 
              placeholder={product.quantity} 
              required 
            />
          </Form.Group>
          <br />
          
          <Button variant="primary" type="submit">Update Product</Button> 
        </Form>
      );
    };

export default ProductUpdate;
