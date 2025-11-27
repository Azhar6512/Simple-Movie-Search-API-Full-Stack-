const express = require("express");
const cors = require("cors");
const movies = require("./data/movies");

const app = express();
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send({ message: "Movie Search API is running..." });
});

/**
 * -----------------------------------------------------
 *  GET /movies/search?title=inc
 * -----------------------------------------------------
 *  Returns all movies where title contains the query
 *  Case-insensitive search
 * -----------------------------------------------------
 */
app.get("/movies/search", (req, res) => {
  const query = req.query.title;

  // If no query provided
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query parameter 'title' is required",
    });
  }

  // Case-insensitive search
  const searchTerm = query.toLowerCase();

  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  res.json(results);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Movie Search API running on port ${PORT}`);
});
