import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

// const BookSearch = ({ onBack }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     // Perform book search based on searchQuery
//     // Update search results
//   };

//   return (
//     <div className="search-books">
//       <div className="search-books-bar">
//         <button className="close-search" onClick={onBack}>
//           Close
//         </button>
//         <div className="search-books-input-wrapper">
//           <input
//             type="text"
//             placeholder="Search by title, author, or ISBN"
//             onChange={handleSearchInputChange}
//             value={searchQuery}
//           />
//           <button onClick={handleSearchSubmit}>Search</button>
//         </div>
//       </div>
//       <div className="search-books-results">
//         <ol className="books-grid"></ol>
//       </div>
//     </div>
//   );
// };

// export default BookSearch;

const BookSearch = ({ handleShelfChange, shelves }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onSearchQueryChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResult([]);
    }

    try {
      const searchResults = await BooksAPI.search(query, 10);
      setSearchResult(searchResults);
    } catch (error) {
      console.error("Error searching books: ", error);
      setSearchResult([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="search-books-bar">
        <div className="close-search-page">
          <Link to="/" className="close-search">
            close
          </Link>
        </div>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={(event) => handleShelfChange(event, book)}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        {shelves.map((shelf) => (
                          <option key={shelf.key} value={shelf.key}>
                            {shelf.title}
                          </option>
                        ))}
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
