import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReadStatus from "./ReadStatus";
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";

const App = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);
  const shelves = [
    { key: "currentlyReading", title: "Currently Reading" },
    { key: "wantToRead", title: "Want to Read" },
    { key: "read", title: "Read" },
  ];
  const handleShelfChange = async (event, bookToUpdate) => {
    const newShelf = event.target.value;
    try {
      const updatedBook = await BooksAPI.update(bookToUpdate, newShelf);
      const updatedBooks = books.map((book) =>
        book.id === updatedBook.id ? { ...book, shelf: newShelf } : book
      );
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
          <ReadStatus books={books} handleShelfChange={handleShelfChange} />
        }
      />
      <Route
        path="/search"
        element={
          <BookSearch handleShelfChange={handleShelfChange} shelves={shelves} />
        }
      />
    </Routes>
  );
};

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import BookSearch from "./BookSearch";
// import ReadStatus from "./ReadStatus";

// // function App() {
//  const App = () => {
//   const [showSearchPage, setShowSearchPage] = useState(ReadStatus);

//   const toggleSearchPage = () => {
//     setShowSearchPage(!showSearchPage);
//   };

//   return (
//     <div className="app">
//       {showSearchPage ? (
//         <BookSearch onBack={toggleSearchPage} />
//       ) : (
//         <ReadStatus onSearch={toggleSearchPage} />
//       )}

//     </div>
//   );
// }

// export default App;
