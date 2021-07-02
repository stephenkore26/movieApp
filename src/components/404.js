import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container mt-2 text-center">    
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;