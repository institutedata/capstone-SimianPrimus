import express from 'express';
const router = express.Router();
import servicesController from '../controllers/artworkControllers';

// Route to get all artworks from the database
router.get('/', servicesController.getAllArtworks);

// Route to start the sync process, fetching object IDs and their details from the Met API
// and updating the database accordingly
router.get('/sync', servicesController.fetchObjectIDs);

// Route to get a random artwork from the database
router.get('/random', servicesController.getRandomArtwork);

// Route to fetch a specific artwork by ObjectID from the database
router.get('/artwork/:objectID', servicesController.getArtwork);

// Route to update an artwork in the database by ObjectID
router.put('/:objectID', servicesController.updateArtwork);

// Route to delete an artwork from the database by ObjectID
router.delete('/delete/:objectID', servicesController.deleteArtwork);

export default router;