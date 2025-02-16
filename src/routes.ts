import express from 'express';
import * as PokeController from './controller';

const router = express.Router();

router.get('/getAll', PokeController.fetchAllPokemons);
router.get('/getAllFavorites', PokeController.fetchAllFavorites);
router.get('/getOne', PokeController.fetchPokemonInfo);
router.post('/addToFavorites', PokeController.addToFavorites);
router.delete('/removeFromFavorites', PokeController.removeFromFavorites);

export default router;
