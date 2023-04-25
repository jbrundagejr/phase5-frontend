export const SERVER_URL = 
  process.env.NODE_ENV === "production" 
    ? "https://phase5-backend-development.onrender.com"
    : "http://localhost:3000"