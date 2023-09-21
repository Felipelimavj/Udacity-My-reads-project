import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Book from "./Book";
import { shelves } from "./Shelves";

const ReadStatus = ({ books, handleShelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div key={shelf.key} className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books"></div>
            <div className="books-grid">
              {books
                .filter((book) => book.shelf === shelf.key)
                .map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    shelves={shelves}
                    handleShelfChange={handleShelfChange}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="open-search">
        <Link to="search" className="toggle-search">
          Add a book
        </Link>
      </div>
    </div>
  );
};
ReadStatus.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ReadStatus;
