import React from 'react';
import ProductList from './components/List';
import ProductForm from './components/Form';
import ProductUpdate from './components/Update';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Navigation from './components/Navbar';
import './App.css'; 

const App = () => (
  <>
  <div className='home'>
    <Navigation />
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm/>} />
        <Route path="/edit/:id" element={<ProductUpdate />} />
      </Routes>
    </Router>
    </div>
  </>
);

export default App;
