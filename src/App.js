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

  return (
    <Routes>
      <Route exact path="/" element={<ReadStatus books={books} />} />
      <Route path="/search" element={<BookSearch />} />
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
