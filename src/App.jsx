import React, { useEffect, useState } from 'react';
import ProductList from './components/List';
import ProductForm from './components/Form';
import ProductUpdate from './components/Update';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Navigation from './components/Navbar';
import './App.css'; 
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './PrivateRoute';
import axios from 'axios';

const API_URL = 'https://product-management-system-bgls.onrender.com/api/products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

 return (
  
  <div className='home'>
    <AuthProvider>
     <Router>
     <Navigation onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<ProductList products={filteredProducts} loading={loading} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<ProtectedRoute element={<ProductForm />} /> } />
        <Route path="/edit/:id" element={<ProtectedRoute element={<ProductUpdate />} />} />
      </Routes>
    </Router>
    </AuthProvider>
    </div>
  
  );
};

export default App;
