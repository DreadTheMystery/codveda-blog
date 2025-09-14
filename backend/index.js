import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import postsRoutes from "./src/routes/posts.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

// health
app.get("/", (req, res) => res.send("Codveda Blog API is running"));

// NODE_ENV check
if (process.env.NODE_ENV === "development") {
  console.log("Running in Dev Mode");
} else {
  console.log("Running in Production Mode");
}

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
