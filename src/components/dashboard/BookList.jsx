import React, { useState } from "react";
import { useEffect } from "react";
import { fetchBooks } from "../../Api";
import { useNavigate } from "react-router-dom";

const BookList = (props) => {
  const {setLoad} = props
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    async function handleBookFetch(params) {
      setLoad({state : true , msg : "Loading.."});
      const bookResult = await fetchBooks(userId);

      setBooks(bookResult?.result || []);

      setLoad({state : false , msg : ""});
    }

    handleBookFetch();
  }, []);

  function formatDateOnly(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function viewbook(id) {
    navigate(`/viewBook/${id}`);
  }

  return (
    <div className="book-container">
      {books.map(function (book, index) {
        return (
          <div
            className="book"
            key={index + 1}
            onClick={() => viewbook(book._id)}
          >
            <div
              className="name"
              style={{ backgroundImage: `url(${book?.coverUrl})` }}
            >
              {book?.title}  <span>by {book?.userId?.authorName}</span>
            </div>
            <div className="info">
              <span>Status : {book?.status}</span>
              <h3>{book?.title}</h3>
              <h4>$ {book?.price} </h4>
              <h6>Published On : {formatDateOnly(book?.createdAt)}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
