import express from 'express';
import servicesController from '../controllers/artworkControllers';

const router = express.Router();

// Route to get all artworks from the database
router.get('/services', servicesController.getAllArtworks);

// Route to start the sync process, fetching object IDs and their details from the Met API
// and updating the database accordingly
router.get('/services/sync', servicesController.fetchObjectIDs);

// Route to get a random artwork from the database
router.get('/services/random', servicesController.getRandomArtwork);

// Route to fetch a specific artwork by ObjectID from the database
router.get('/services/artwork/:objectID', servicesController.getArtwork);

// Route to update an artwork in the database by ObjectID
router.put('/services/:objectID', servicesController.updateArtwork);

// Route to delete an artwork from the database by ObjectID
router.delete('/services/delete/:objectID', servicesController.deleteArtwork);

export default router;