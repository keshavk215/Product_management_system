import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Navigation({ onSearch }) {

const navigate = useNavigate();
const handleLogin = () => {
  navigate('/login');
};

const { logout } = useAuth();
const handleLogout = () => {
  logout(); 
  navigate('/');
};

const [searchQuery, setSearchQuery] = useState("");
const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  onSearch(query); 
};

const { token } = useAuth();
  return (
    <>
      <Navbar sticky="top" style={{background:"rgba(255, 255, 255, 0.2)", backdropFilter:"blur(20px)"}} >
          <Nav className="ml-3 me-auto py-2.5 ">
            <Nav.Link href="/" className='text-white'>All Products</Nav.Link>
            <Nav.Link href="add" className='text-white'>Add new product</Nav.Link>
          </Nav>
          <Form inline className='mr-4'>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          {token ? (<Col xs="auto">
            <Button onClick={handleLogout}>Logout</Button>
          </Col>  
              ) : (<Col xs="auto">
                <Button onClick={handleLogin}>Login</Button>
                </Col>
              )}
          
        </Row>
      </Form>
      </Navbar>
      <br />
    </>
  );
}

export default Navigation;