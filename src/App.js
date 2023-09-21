import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReadStatus from "./ReadStatus";
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";

const App = ({ shelves }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);
  const handleShelfChange = async (event, bookToUpdate) => {
    const newShelf = event.target.value;
    try {
      const updatedBook = await BooksAPI.update(bookToUpdate, newShelf);

      bookToUpdate.shelf = newShelf;

      const filteredBooks = books.filter((book) => book.id !== updatedBook.id);

      const updatedBooks = filteredBooks.concat();

      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book shelf: ", error);
    }
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ReadStatus
            books={books}
            setBooks={setBooks}
            handleShelfChange={handleShelfChange}
            shelves={shelves}
          />
        }
      />

      <Route
        path="/search"
        element={
          <BookSearch
            books={books}
            setBooks={setBooks}
            handleShelfChange={handleShelfChange}
            shelves={shelves}
          />
        }
      />
    </Routes>
  );
};

export default App;
