import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      title: title,
      author: author
    };

    axios
      .post('http://localhost:3006/books', newBook)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // 폼 초기화
    setTitle('');
    setAuthor('');
  };

  return (
<div className="book-form-container">
    <h2>Please add a new book:</h2>
    <form onSubmit={handleSubmit} className="book-form">
      <div className="book-form-input">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="book-form-input-field"
        />
      </div>
      <div className="book-form-input">
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="book-form-input-field"
        />
      </div>
      <button type="submit" className="book-form-submit">Submit</button>
    </form>
  </div>
  );
}

export default BookForm;
