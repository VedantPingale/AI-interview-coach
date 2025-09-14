# AI Interview Coach (Frontend-Only Prototype)

A sophisticated **frontend-only** web application built with **React** and **TypeScript**. This interactive prototype functions as an **AI-powered interview coach**. While designed with a fully local architecture in mind, it currently uses the **Google Gemini API** for AI features as a proof of concept.

## 🌟 Core Architecture
- **Single-Page Application (SPA):** Entirely runs in your browser. No backend server required.
- **Local-First Data Storage:** Uses a mock service (`supabaseService.ts`) simulating a database via Local Storage. All data (profiles, past interviews) stays on your computer for **privacy** and **offline functionality**.
- **Component-Based UI:** Built with reusable **React components** and styled using **Tailwind CSS**. Features a **modern, responsive, dark-themed** design with **yellow, purple, and cyan accents**.

## ✨ Key Features
- 🔐 **Mock User Authentication:** Sign up and log in. User info securely stored in Local Storage. Authenticated users can access protected pages like:
  - Progress Tracker
  - Profile
  - Settings
- 🧭 **End-to-End Interview Flow:**
  1. **Domain Selection:** Choose a professional domain (e.g., Tech, Business) and role (e.g., Frontend Developer, Product Manager).
  2. **Dynamic Question Generation:** Uses Gemini API to generate **10 high-quality interview questions**.
  3. **Interactive Session:** Questions are presented one by one, with **Text-to-Speech** reading them aloud.
  4. **AI-Powered Analysis:** Submits answers to Gemini for detailed performance analysis.
  5. **Comprehensive Reporting:** Detailed feedback includes:
     - Overall performance summary
     - Numerical scores (fluency, tone, grammar, etc.)
     - Full review of all Q&A
- 📈 **Progress Tracking:** Saves completed sessions for logged-in users. The **Progress Tracker** page visualizes improvement over time using **Recharts**.

## 🛠 Technology Stack
- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **AI Service:** Google Gemini API (`@google/genai`)
- **Data Visualization:** Recharts
- **State Management:** React Context API & Custom Hooks (`useAuth`, `useTextToSpeech`)

## 🚀 Project Vision
This app is currently a **fully functional demonstration**. The long-term goal is to **replace the Gemini API** with a **local AI framework** like [OLLAMA](https://ollama.com), enabling:
- 100% privacy
- Offline capability
- Completely free AI processing on the user's machine

## 🧑‍💻 Run Locally
### Prerequisites
- [Node.js](https://nodejs.org/) installed

### Steps
1. **Install dependencies:**
   ```bash
   npm install
