import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import './App.css';

function BookList() {
   const [books, setBooks] = useState([]);
 
   useEffect(() => {
     axios
       .get("http://localhost:3006/books")
       .then((response) => {
         setBooks(response.data);
       })
       .catch((err) => {
         console.log(err);
       });
   }, []);
 
   const addBook = (newBook) => {
     setBooks([...books, newBook]);
   };
 
   const deleteBook = (id) => {
     axios
       .delete(`http://localhost:3006/books/${id}`)
       .then(() => {
         setBooks(books.filter((book) => book.id !== id));
       })
       .catch((err) => {
         console.log(err);
       });
   };
 
   return (
     <div id="book-list">
       <h4>Book List (set max 50 books):</h4>
       {books.map((book) => (
         <div key={book.id} className="book-item">
           <div className="book-info">
             <h2>{book.title}</h2>
             <p>{book.author}</p>
           </div>
           <button className="delete-button" onClick={() => deleteBook(book.id)}>Delete</button>
         </div>
       ))}
       <BookForm onAddBook={addBook} />
     </div>
   );
 }
 
 export default BookList;