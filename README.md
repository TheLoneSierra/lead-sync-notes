# Lead Sync + Notes Application

## Overview
A small full-stack web application that fetches leads from a mock API, allows adding notes per lead, and generates concise AI-powered summaries for those notes.

## Features
- Fetches leads (name, email, phone) from a public mock API
- Displays leads in a responsive table
- Add notes for each lead via a modal interface
- Generate AI summaries (max 20 words) using an LLM
- Stores notes and summaries in an in-memory data store

## Tech Stack
- Next.js (App Router)
- React (JavaScript)
- Next.js API Routes for backend
- Groq SDK (OpenAI-compatible LLM: `gpt-oss-120b`)
- In-memory store for persistence

## Data Storage
Notes and summaries are stored in an in-memory store on the server.  
Data persists for the lifetime of the server process and can be easily replaced with a database or file-based persistence without changing the API design.

## Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Steps
```bash
npm install
npm run dev
