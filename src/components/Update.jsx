import React, { useState,useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const API_URL = 'https://product-management-system-bgls.onrender.com/api/products';

const ProductUpdate = () => {
    const { id } = useParams();
    const { token } = useAuth();
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
        await axios.put(`${API_URL}/${id}`, product,{
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
        window.alert('Product updated successfully!');
         
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };

    return (
      <div style={{display:"flex", justifyContent:"center", height:"min(100vh)"}}>
            <Card style={{ width: '50%', height:"70vh",fontFamily:"'Times New Roman', Times, serif", background:"linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)"}} className=" card-animation px-3 py-3" >
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
          </Form.Group><br/>
          
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              placeholder={product.description } 
            />
          </Form.Group><br/>
          
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
          </Form.Group><br/>
          
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
        </Card>
      </div>
      );
    };

export default ProductUpdate;
