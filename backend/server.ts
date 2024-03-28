import { configDotenv } from 'dotenv';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express'; 
import init from './models/index';
import path from 'path';

const app = express();
configDotenv();

// Initialize database
init.init();

import serviceRoutes from './routes/ArtworkRoutes';
import userRoutes from './routes/userRoutes';
import userArtworkRoutes from './routes/originalArtwork';
import likeRoutes from './routes/likeRoutes';
import galleryLikeRoutes from './routes/galleryLikeRoutes';
import swaggerDocument from './swagger.json';
import fs from 'fs';

app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', serviceRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Artwork database routes
app.use('/api/services', serviceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/originalArtwork', userArtworkRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/galleryLike', galleryLikeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});