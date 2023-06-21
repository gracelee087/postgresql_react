import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';


function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
      </ul>

  
    </nav>
  );
}

export default Navbar;
