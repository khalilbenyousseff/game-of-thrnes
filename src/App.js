import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [books, setBooks] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      'https://www.anapioficeandfire.com/api/books'
    );

    setBooks(response.data);
  };

  return (
    <div className="App">
      <h1>Game of Thrones</h1>
      <h2>Fetch the books</h2>

     
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      
      <div className="books">
        {books &&
          books.map((book, index) => {
            const authors = book.authors.join(', ');

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>{authors}</p>
                  <p>{book.characters}</p>
                  <p>{book.numberOfPages} pages</p>
                  <p>{book.country}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
