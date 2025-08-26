import React, { useState } from "react";
import {
  bookCreateReq,
  extractPdfText,
  generateDescription,
  uploadFile,
} from "../../Api";

const Form = (props) => {
  const { isOpen, isOpen2, form, setForm, setLoad } = props;
  const [file, setFile] = useState(null);
  console.log(form);
  const [err, setErr] = useState("");
  const [uploadMsg , setUploadMsg] = useState('Choose File')

 async function handleChange(e) {
  const { name, value, files } = e.target;

  if (name === "pdfUrl" && files && files[0]) {
    const file = files[0];

    // 1. Type check
    if (file.type !== "application/pdf") {
      setErr("Please choose only PDF file.");
      return; 
    }

    const maxSize = 20 * 1024 * 1024; 
    if (file.size > maxSize) {
      setErr("PDF size must be less than 20 MB.");
      return;
    }

    setErr("");

    setLoad({ state: true, msg: "Extracting Text" });
    const text = await extractPdfText(file);

    setForm((prev) => ({
      ...prev,
      text: text,
    }));

    setLoad({ state: true, msg: "Uploading PDF" });
    const url = await uploadFile(file);
    console.log(url);

    setUploadMsg("File Uploaded");
    setForm((prev) => ({
      ...prev,
      pdfUrl: url,
    }));

    setLoad({ state: false, msg: "" });

  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
}

  async function handleCreateReq(params) {
    setErr("");
    if (form.title === "") {
      return setErr("Please Enter Title");
    } else if (form.genre === "") {
      return setErr("Please Enter Genre");
    } else if (form.price === "" || isNaN(form.price)) {
      return setErr("Please Enter a Valid Price");
    } else if (form.pdfUrl === "") {
      return setErr("Please Choose File");
    }

    const userId = localStorage.getItem("userId");

    setLoad({ state: true, msg: "Save Details" });

    const { title, genre, price, status, pdfUrl = url } = form;

    const createRes = await bookCreateReq({
      title,
      genre,
      price,
      userId,
      status,
      pdfUrl,
    });

    if (createRes.message !== "Book created successfully.") {
      setErr("Failed to upload Book Try again");
    setLoad({ state: false, msg: "" });

      return;
    }

    isOpen(false);

    setLoad({ state: true, msg: "Generating AI description..." });

    const response = await generateDescription(form.text);

    const description = response?.description || "";
    const keywords = response?.keywords || "";
    console.log(createRes);

    await setForm((prev) => ({
      ...prev,
      description,
      keywords,
      id: createRes?.response?._id,
    }));

    console.log(form);
    setLoad(false);

    isOpen2(true);
  }
  return (
    <div className="formContainer">
      <h2>Publish a Book</h2>

      <input
        type="text"
        name="title"
        value={form?.title || ""}
        placeholder="Please Enter a Title"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        value={form.genre}
        name="genre"
        placeholder="Please Enter a Genre"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        value={form.price}
        name="price"
        placeholder="Please Enter a Price"
        onChange={(e) => handleChange(e)}
      />
   <section>
       <input
        type="file"
        name="pdfUrl"
        id=""
        onChange={(e) => handleChange(e)}
      />
   </section>
{uploadMsg!=="" &&<span>{uploadMsg}</span>}

      <div className="errMsg">{err}</div>
      <button onClick={handleCreateReq}>Submit</button>
    </div>
  );
};

export default Form;
