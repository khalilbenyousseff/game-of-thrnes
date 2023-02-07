import { useState, useEffect } from 'react';
import axios from 'axios';
import getItems from './pages/names';
export default function App() {
  // const apiBase = 'https://www.anapioficeandfire.com/api';
  for (let i = 1; i <= 20; i++) {
    getItems(i);
  }
  const [utilisateurs, setUtilisateurs] = useState([]);
  const api = 'https://www.anapioficeandfire.com/api/characters';
  useEffect(() => {
    fetch(`${api}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setUtilisateurs(data));
  }, [api]);
  const [books, setBooks] = useState(null);
  const fetchData = async () => {
    const response = await axios.get('https://anapioficeandfire.com/api/books');

    setBooks(response.data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Game of Thrones</h1>
      <h2>Fetch the books</h2>

      <div>
        <button onClick={fetchData}>Fetch Data</button>
        <br />
      </div>

      <div>
        {books &&
          books.map((book, index) => {
            const authors = book.authors.join(', ');

            return (
              <div key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div>
                  <p>{authors}</p>
                  <p>
                    {utilisateurs.map((utilisateur, index) => {
                      return <p key={index + 1}>{utilisateur.name}</p>;
                    })}
                  </p>
                  <p></p>
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
