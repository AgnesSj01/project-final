# Seasonal Recipes

A full-stack web application for discovering and saving seasonal recipes. Browse recipes by season, filter by diet and allergies, rate recipes, and save your favourites.

**Live app:** [agnesfinal-project.netlify.app](https://agnesfinal-project.netlify.app/)  
**API:** [seasoned-api.onrender.com](https://seasoned-api.onrender.com/)

---

## Features

- Browse recipes filtered by season (spring, summer, autumn, winter)
- Filter by diet (vegan, vegetarian) and allergies (lactose-free, gluten-free)
- Search recipes by name
- Sort by most/least popular based on ratings
- Rate recipes
- User registration and login
- Save and manage favourite recipes (requires login)

## Tech Stack

**Frontend**
- React
- React Router
- Axios

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- bcryptjs (password hashing)

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend` folder:

```
MONGO_URL=your_mongodb_connection_string
PORT=8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API to run on `http://localhost:8080`. Update `frontend/src/utils/api.js` if needed.

## API Endpoints

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/recipes` | Get all recipes. Query: `?season=spring&search=pasta` | No |
| GET | `/recipes/:id` | Get a single recipe | No |
| GET | `/recipes/popular` | Get recipes sorted by average rating | No |
| GET | `/recipes/:id/reviews` | Get reviews for a recipe | No |
| POST | `/recipes/:id/reviews` | Add a rating to a recipe | No |
| POST | `/users` | Register a new user | No |
| POST | `/sessions` | Login | No |
| GET | `/favourites` | Get user's saved recipes | Yes |
| POST | `/favourites/:recipeId` | Save a recipe | Yes |
| DELETE | `/favourites/:recipeId` | Remove a saved recipe | Yes |

## Deployment

- Frontend deployed on [Netlify](https://agnesfinal-project.netlify.app/)
- Backend deployed on [Render](https://seasoned-api.onrender.com/)
- Database hosted on MongoDB Atlas

> Note: The backend runs on Render's free tier and may take up to 60 seconds to wake up after inactivity.
