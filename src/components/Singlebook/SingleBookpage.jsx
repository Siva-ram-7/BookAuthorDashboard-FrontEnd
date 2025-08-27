import React, { useState } from "react";
import "../dashboard/dashboard.css";
import { bookUpdateReq, fetchSingleBook, uploadFile } from "../../Api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const SingleBookpage = () => {

  const navigate = useNavigate()
  const [load, setLoad] = useState({ state: true, msg: "" });

  const [book, setBook] = useState({});
  const [edit, setEdit] = useState(false);
  const [req, setReq] = useState(true);

  const { bookId } = useParams();
  useEffect(() => {
    async function handlefetchReq(params) {
      setLoad({ state: true, msg: "Fetching Book" });
      const fetchResult = await fetchSingleBook(bookId);


       if (fetchResult == "Error fetch book") {
       return  navigate('/*' ,{replace : true})
      }

      setBook(fetchResult?.result);
      setLoad({ state: false, msg: "" });
    }

    handlefetchReq();
  }, [req]);

  function handleColorPick(e) {
    const color = e.target.value;
    const canvas = document.getElementById("coverCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function handleColorPick(e) {
    const color = e.target.value;
    const canvas = document.getElementById("coverCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  async function handleUploadCover() {
    const canvas = document.getElementById("coverCanvas");

    canvas.toBlob(async (blob) => {
      if (!blob) return;
    const uniqueName = `${bookId}-${Date.now()}.png`;
const file = new File([blob], uniqueName, { type: "image/png" });


      setLoad({ state: true, msg: "coverImage Uploading..." });
      const url = await uploadFile(file);
      console.log("Cover uploaded at:", url);

      setLoad({ state: true, msg: "coverImage Storing..." });

      await bookUpdateReq({ coverUrl: url }, bookId);

      setEdit(false)
      setReq(!req);

      setLoad({ state: false, msg: "" });

    }, "image/png");
  }

  function formatDateOnly(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

function handleViewPdf(link) {
  window.open(link, "_blank"); 
}

  return (
    <div className="single-book">
      <button className="backbtn" onClick={()=>navigate("/")}>Back to Dashboard</button>
      <div className="book-card">
      

        <div className="coverImage">
          <div
            className="name2"
            style={{ backgroundImage: `url(${book?.coverUrl})` }}
          >
            {book?.title} -By {book?.userId?.authorName}
          </div>

          {!edit && (
            <button className="upload-btn" onClick={() => setEdit(!edit)}>
              Edit Cover
            </button>
          )}
        </div>

        {edit && (
          <div className="cover-section">
            <canvas id="coverCanvas" className="cover-canvas"></canvas>
            <input
              type="color"
              className="color-picker"
              onChange={handleColorPick}
            />
            <button className="upload-btn" onClick={handleUploadCover}>
              Save Cover
            </button>
          </div>
        )}

   
        <div className="book-details">
          <h2>{book.title}</h2>
          <h3>Genre: {book.genre}</h3>
          <p><strong>Description :</strong>{book.description}</p>
          <p><strong>Keywords :</strong>
            {book.keywords}</p>
          <h3>Price: ${book.price}</h3>
          <h3>Status: {book.status}</h3>
          <h3>Published On: {formatDateOnly(book.createdAt)}</h3>
          <button onClick={()=>handleViewPdf(book?.pdfUrl)}>Read Book</button>
        </div>
      </div>

      {load.state && (
        <div className="loader-hold">
          <div className="loader"></div>
          <div className="load-msg">{load.msg}</div>
        </div>
      )}
    </div>
  );
};

export default SingleBookpage;
