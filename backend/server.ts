import dotenv from "dotenv";
import cors from "cors";
import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import init from "./models/index";
import path from "path";
import serviceRoutes from "./routes/ArtworkRoutes";
import userRoutes from "./routes/userRoutes";
import userArtworkRoutes from "./routes/originalArtwork";
import likeRoutes from "./routes/likeRoutes";
import galleryLikeRoutes from "./routes/galleryLikeRoutes";
import swaggerDocument from "./swagger.json";
import fs from "fs";

// Initialize express
const app = express();
// Initialize dotenv
dotenv.config();
// Initialize database
init.init();
// Middleware
app.use(express.json());
app.use(cors());
// Create uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Artwork database routes
app.use("/api/services", serviceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/originalArtwork", userArtworkRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/galleryLike", galleryLikeRoutes);
// Error handling middleware for all routes
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global error handler:", error);
  const status = error.statusCode || error.status || 500;
  res.status(status).json({
    error: {
      message: error.message,
      status: status,
    },
  });
});
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
