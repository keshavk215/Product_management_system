import React from 'react';
import { Card, Button } from 'react-bootstrap';
import "./Item.css";

const ProductCard = ({ product, onEdit, onDelete}) => {
  return (
    <Card style={{ width: '50%',fontFamily:"'Times New Roman', Times, serif", background:"linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)"}} className="m-3 card-hover" >
      <Card.Body>
        <Card.Title style={{fontSize:"1.5rem", fontWeight:"bold"}}>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₹{product.price}
        </Card.Text>
        <Card.Text>
          <strong>Quantity:</strong> {product.quantity}
        </Card.Text>
        <Button variant="danger" onClick={() => onEdit(product.id)} className="me-2">Edit</Button>
        <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
