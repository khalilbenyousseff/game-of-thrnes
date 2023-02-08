import React, { useState, useEffect } from 'react';

/*----------  BOOK --------------*/

const BookList = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://anapioficeandfire.com/api/books');
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.url} onClick={() => onBookSelect(book)}>
          {book.name}
        </li>
      ))}
    </ul>
  );
};

/*--------------- CHARACTER ----------*/

const CharacterList = ({ bookId }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://anapioficeandfire.com/api/books/${bookId}/characters`
        );
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [bookId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.url}>{character.name}</li>
      ))}
    </ul>
  );
};

/*------------APP------------*/

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div>
      <h1>Books</h1>
      <BookList onBookSelect={setSelectedBook} />
      {selectedBook && (
        <>
          <h1>Characters</h1>
          <CharacterList bookId={selectedBook.url} />
        </>
      )}
    </div>
  );
};

export default App;
