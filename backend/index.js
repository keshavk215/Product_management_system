const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const { Pool } = require('pg');
const authenticateToken = require('./authentication/auth');

const PORT =  5000;
var corsoption = {
    origin: 'https://product-management-system.vercel.app',
  };

  const app = express();
  app.use(cors(corsoption));
  app.use(express.json())

const pool = new Pool({
    connectionString: 'postgresql://keshav:JWBKXJlQ77GVqfl5ferQ5hZva8rncEHj@dpg-csea8tu8ii6s738vis60-a.oregon-postgres.render.com/product_management_hs0n',  
    ssl: {
      rejectUnauthorized: false, 
    },
  });
  
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price FLOAT,
    quantity INTEGER
  );
`;

async function createTable() {
  try {
    await pool.query(createTableQuery);
    console.log("Table 'products' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
`;

async function createUserTable() {
  try {
    await pool.query(createUserTableQuery);
    console.log("Table 'users' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable(); 
createUserTable(); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET operation
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]); 
    if (!product.rows.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST operation
app.post('/api/products', authenticateToken , async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, quantity]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT operation
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [name, description, price, quantity, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE operation
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register user
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      if (error.code === '23505') { 
          return res.status(400).json({ message: 'Username already exists' });
      }
      res.status(500).json({ error: error.message });
  }
});

// Login user
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      // Validate user and password
      if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id }, 'yourSecretKey', { expiresIn: '1h' });
          res.json({ token });
      } else {
          res.status(400).json({ message: 'Invalid credentials' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
