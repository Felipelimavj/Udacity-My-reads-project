import { useState } from "react";
import { Link } from "react-router-dom";
import { shelves } from "./Shelves";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const BookSearch = ({ books, handleShelfChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onSearchQueryChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query || query === "") {
      setSearchResult();
      return;
    }
    try {
      const searchResults = await BooksAPI.search(query, 10);

      if (event.target.value === query) {
        if (Array.isArray(searchResults) && searchResults.length > 0) {
          setSearchResult(searchResults);
        } else {
          setSearchResult([]);
        }
      }
    } catch (error) {
      console.error("Error searching books: ", error);
      setSearchResult([]);
    }
  };

  // console.log(searchResult);
  console.log(books);
  console.log(handleShelfChange);
  // console.log(setSearchResult);
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
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult?.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelves={shelves}
              handleShelfChange={handleShelfChange}
            />
          ))}
          {searchResult?.length < 1 && <p>No matching books found.</p>}
        </ol>
      </div>
    </div>
  );
};
export default BookSearch;
