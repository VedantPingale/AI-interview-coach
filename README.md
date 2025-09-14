This is a sophisticated, frontend-only web application built with React and TypeScript. It functions as a fully interactive prototype of an AI-powered interview coach. While it's designed with a "fully local" architecture in mind, it currently uses the Google Gemini API for its AI features as a proof of concept.
Core Architecture
Single-Page Application (SPA): The entire application runs in the user's web browser. There is no backend server.
Local-First Data Storage: The app uses a clever mock service (supabaseService.ts) that simulates a real database by using your browser's Local Storage. This means all user data, including profiles and past interview sessions, is stored directly on your computer, ensuring privacy and making the app work offline.
Component-Based UI: The user interface is built with reusable React components and styled with Tailwind CSS, creating a modern, responsive, and visually appealing dark-themed design with yellow, purple, and cyan accents.
Key Features Implemented
Mock User Authentication:
Users can sign up and log in. This information is saved securely in the browser's Local Storage.
The application state correctly reflects whether a user is logged in or not, showing different UI elements accordingly (e.g., a login button vs. a profile menu).
Protected pages like "Progress Tracker," "Profile," and "Settings" are only accessible to authenticated users.
End-to-End Interview Flow:
Domain Selection: Users start by choosing a professional domain (e.g., Tech, Business) and a specific role (e.g., Frontend Developer, Product Manager).
Dynamic Question Generation: The app sends the user's selection to the Gemini API to generate 10 relevant, high-quality interview questions.
Interactive Session: Users are guided through the questions one by one. Each question is automatically read aloud using the browser's built-in Text-to-Speech functionality.
AI-Powered Analysis: After the user submits their answers, they are sent to the Gemini API for a detailed performance analysis.
Comprehensive Reporting: The user receives a detailed report with overall feedback, numerical scores (for fluency, tone, grammar, etc.), and a complete review of their questions and answers.
Progress Tracking:
For logged-in users, each completed interview session is saved.
The "Progress Tracker" page visualizes performance over time using an interactive line chart, helping users see their improvement.
Technology Stack
Frontend Framework: React 19 with TypeScript
Styling: Tailwind CSS
Routing: React Router
AI Service: Google Gemini API (@google/genai)
Data Visualization: Recharts
State Management: React Context API and custom hooks (useAuth, useTextToSpeech).
Project Vision
As stated on the "About" page, the current application is a fully functional demonstration. The ultimate goal is to replace the cloud-based Gemini API with a local AI model framework like OLLAMA. This would make the application 100% private, offline-capable, and completely free to run, as all AI processing would happen on the user's own machine.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
