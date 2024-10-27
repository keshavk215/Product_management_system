import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const API_URL = 'https://product-management-system-bgls.onrender.com/api/products';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, product, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    setProduct({ name: '', description: '', price: '', quantity: '' });
    window.alert('Product added successfully!');
  };

  return (
    <div style={{display:"flex", justifyContent:"center", height:"min(100vh)"}}>
    <Card style={{ width: '50%', height:"70vh",fontFamily:"'Times New Roman', Times, serif", background:"linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)"}} className=" card-animation px-3 py-3" >
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
    </Form.Group><br/>
    <Form.Group controlId="formDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" value={product.description} onChange={handleChange} />
    </Form.Group><br/>
    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
    </Form.Group><br/>
    <Form.Group controlId="formQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
    </Form.Group><br/>
    <Button variant="primary" type="submit" >Add Product</Button> 
  </Form>
  </Card>
  </div>
  );
};

export default ProductForm;
