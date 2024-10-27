# Product Management System

A Product Management System built with React, Node.js, and PostgreSQL. This application allows users to manage products, including viewing, adding, editing, and deleting products.

The website is deployed at [https://product-management-system-9g7k.onrender.com](https://product-management-system-9g7k.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- View a list of products
- Add new products
- Edit existing products
- Delete products
- User authentication (register/login)
- Dynamic search bar

## Technologies

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js, PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/keshavk215/product-management-system.git
cd product-management-system
```

### 2. Set Up the Backend

#### i. Navigate to the backend directory:

```
cd backend
```

#### ii. Install backend dependencies:

```
npm install
```

#### iii. Set up the PostgreSQL database:

Create a new PostgreSQL database and user (if necessary).

#### iv. Update your database connection settings in index.js:

```
const pool = new Pool({
    connectionString: 'YOUR CONNECTION STRING',  
    ssl: {
      rejectUnauthorized: false, 
    },
  });
```

#### v. Update origin settings in index.js:

```
var corsoption = {
    origin: 'http://localhost:5173',
  };
```

### 3. Set Up the Frontend

#### i. Install frontend dependencies:

```
npm install
```

#### ii. Update API_URL in App.jsx,Form.jsx, List.jsx and Update.jsx.

```
const API_URL = 'http://localhost:5000/api/products';
```

#### iii. Update API_URL in Login.jsx and Register.jsx.

```
const API_URL = 'http://localhost:5000/auth/login';
```

```
const API_URL = 'http://localhost:5000/auth/register';
```

## Running the Application

#### 1. Start the backend server:

```
cd backend
npm start
```

#### 2. Start the frontend application:

```
npm start
```

#### Open your browser and go to `http://localhost:5173` to access the application.

## API Endpoints

#### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in and receive a JWT token.

#### Product Management

* **GET** `/api/products`: Fetch all products.
* **POST** `/api/products`: Add a new product (requires token).
* **PUT** `/api/products/:id`: Edit an existing product (requires token).
* **DELETE** `/api/products/:id`: Delete a product (requires token).
