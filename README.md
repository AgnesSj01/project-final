# Seasoned - Seasonal Recipe App

A fullstack web application that helps users discover recipes based on seasonal ingredients. Users can browse, search, filter, save favorites, and rate recipes — all with a focus on sustainable, seasonal eating.

## The Problem

We wanted to build an app that makes it easy to eat sustainably by highlighting what's in season. The main challenge was connecting a React frontend with a Node.js/Express backend and MongoDB database, handling user authentication, and making the app fully responsive across all devices.

**Approach:**
- Planned the project with Figma wireframes and a component structure
- Built the backend API first with authentication, then connected it to the React frontend
- Used a mobile-first CSS approach for responsive design (320px–1600px)
- Iterated on filtering, rating, and favorites features based on user feedback

**If we had more time:**
- Add image upload for user-submitted recipes
- Implement a meal planner with seasonal suggestions
- Add email confirmation on registration
- Improve loading states with skeleton screens

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** v7 for navigation
- **Context API** for global state management (AuthContext)
- **Axios** for HTTP requests
- **react-icons** for UI icons

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **bcryptjs** for password hashing
- **JSON Web Tokens** for authentication
- **CORS** and **dotenv** for configuration

## Features

- Browse recipes with search and filtering (season, diet, allergies)
- Sort by popularity (most/least rated)
- User registration and login with secure authentication
- Save/remove favorite recipes
- Rate recipes with a 1–5 star system
- Personalized greeting in the navbar
- Responsive design with hamburger menu on mobile/tablet
- Seasonal food guide for sustainable eating

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/recipes` | No | Get all recipes (optional `?season=` filter) |
| GET | `/recipes/:id` | No | Get a single recipe |
| GET | `/recipes/popular` | No | Get recipes sorted by average rating |
| GET | `/recipes/:recipeId/reviews` | No | Get reviews for a recipe |
| POST | `/recipes/:recipeId/reviews` | No | Submit a review/rating |
| POST | `/users` | No | Register a new user |
| POST | `/sessions` | No | Login |
| GET | `/favourites` | Yes | Get user's saved recipes |
| POST | `/favourites/:recipeId` | Yes | Save a recipe |
| DELETE | `/favourites/:recipeId` | Yes | Remove a saved recipe |

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas connection string)

### Backend
```bash
cd backend
npm install
# Create a .env file with MONGO_URL and optionally PORT
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000` by default.

## View it live

- **Frontend:** https://seasoned-recipes.netlify.app
- **Backend API:** https://seasoned-api.onrender.com
