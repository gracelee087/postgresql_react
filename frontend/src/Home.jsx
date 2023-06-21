import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookForm from './BookForm';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3006/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
     <nav style={{ display: 'flex', justifyContent: 'center' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">BookList</Link>
          </li>
        </ul>
      </nav>

      <div id="books" style={{ border: "1px solid grey" }}>
        <h3>WELCOME TO WORLD BOOK STORE!</h3>
        <br />

        <h4>Book List (set max 50 books):</h4>
        <div>
        {books.map((book) => (
         <div key={book.id} className="book-item">
           <div className="book-info">
             <h2>{book.title}</h2>
             <p>{book.author}</p>
           </div>
         </div>
       ))}
        </div>
      </div>

      <BookForm />
    </>
  );
}

export default Home;
