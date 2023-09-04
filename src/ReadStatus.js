// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

const ReadStatus = ({ books, setBooks }) => {
  const shelves = [
    { key: "currentlyReading", title: "Currently Reading" },
    { key: "wantToRead", title: "Want to Read" },
    { key: "read", title: "Read" },
  ];

  const handleShelfChange = async (event, bookToUpdate) => {
    const newShelf = event.target.value;
    try {
      const updatedBook = await BooksAPI.update(bookToUpdate, newShelf);

      bookToUpdate.shelf = newShelf;

      const filteredBooks = books.filter((book) => book.id !== updatedBook.id);

      const updatedBooks = filteredBooks.concat(bookToUpdate);

      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book shelf: ", error);
    }
  };
  // console.log(books);
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
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === shelf.key)
                .map((book) => (
                  <li key={book.id} className="book">
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
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      <p>Author: {book.authors}</p>
                    </div>
                  </li>
                ))}
            </ol>
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
