import React from 'react';
import { Card, Button } from 'react-bootstrap';
import "./Item.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card style={{ width: '50%',}} className="m-3 card-hover">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₹{product.price.toFixed(2)}
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
