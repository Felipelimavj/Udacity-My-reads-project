import React from "react";
import { shelves } from "./Shelves";
const Book = ({ book, handleShelfChange }) => {
  return (
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
            <option value="Move to">Move to...</option>
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
    </div>
  );
};

export default Book;
