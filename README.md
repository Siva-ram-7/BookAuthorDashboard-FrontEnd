# Author Dashboard – Frontend (React + Vite)

## Overview
This is the frontend for a mini author dashboard where authors can:
- Upload a PDF manuscript with title, genre, and price.
- Design a cover (upload image or choose solid color + add text overlay).
- Generate AI-based description and keywords using RapidAPI.
- Publish the book (cover + description + metadata) and view it in a dashboard.

The dashboard displays:
- Book title
- Upload date
- Auto-updating status (Processing → Published after 5 seconds)
- Saved cover image and description

## Tech Stack

-Node.js + Express for the backend server

MongoDB for database

OpenAI Node.js SDK (via RapidAPI) to generate book description and keywords

Firebase Storage for PDF and cover image URLs (handled on frontend, but backend stores metadata)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Siva-ram-7/BookAuthorDashboard-FrontEnd.git
   cd BookAuthorDashboard-FrontEnd


2.Install dependencies:

npm install



3.Create a .env file in the root folder:

VITE_API_BASE_URL=http://localhost:3500
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com


4.Start the frontend:

npm run dev

5.Open http://localhost:5173
 in your browser (Vite default port).



6. NOTE: You must create a user in the backend first (using Postman at /register). 
See backend README for details.


 Usage



Click Public → fill in the form → upload PDF → generate AI description → publish.

Cover image and PDF are stored in Firebase.

Book details are sent to the backend.

Dashboard shows uploaded books with status and cover image.



Approach

Vite provides fast development and hot reload.

Firebase is used for secure file storage.

RapidAPI provides free AI description/keywords.

Frontend communicates with the backend on http://localhost:3500.

AI description and keyword generation is handled in the backend using the OpenAI Node.js SDK, which connects to a RapidAPI-powered AI model. The frontend simply triggers the backend API /book/analyze to generate the content.