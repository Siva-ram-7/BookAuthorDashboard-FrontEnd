
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios'

export async function loginReq(data) {
  try {
    const response = await axios.post(
      `${apiUrl}/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response?.data || "Failed to load";

    localStorage.setItem("email", message.isUserExist.email);
    localStorage.setItem("userId", message.isUserExist._id);
    localStorage.setItem("author", message.isUserExist.authorName);
    return message;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.response.data.message;
  }
}
export async function bookCreateReq(data) {
  try {
    const response = await axios.post(
      `${apiUrl}/book/create`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data;

    return message;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.response.data.message;
  }
}
export async function bookUpdateReq(data, id) {
  try {
    const response = await axios.put(
       `${apiUrl}/book/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data;
    return message;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.response.data.message;
  }
}
export async function fetchBooks(userId) {
  try {
    const response = await axios.get(
      ` ${apiUrl}/book/viewbyUser/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data;

    return message;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.response.data.message;
  }
}
export async function fetchSingleBook(bookId) {
  try {
    const response = await axios.get(
       `${apiUrl}/book/view/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data;

    return message;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return error.response.data.message;
  }
}

import * as pdfjsLib from "/node_modules/.vite/deps/pdfjs-dist.js?v=f36ad243";
import "/node_modules/.vite/deps/pdfjs-dist_build_pdf__worker__mjs.js?v=f36ad243"; 
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const typedArray = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument(typedArray).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n";
  }

  console.log(text);

  return text;
}

import { ref, uploadBytes, getDownloadURL } from "/node_modules/.vite/deps/firebase_storage.js?v=f36ad243";
import { storage } from "./firebase";

export async function uploadFile(file, folder = "") {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}`);


    const snapshot = await uploadBytes(storageRef, file);
    console.log("Uploaded successfully:", snapshot.metadata.fullPath);

 
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}

export async function generateDescription(text) {
  const res = await fetch( `${apiUrl}/book/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text }),
  });

  const data = await res.json();
  return data || "";
}
