import { RequestHandler } from 'express';
import pokemonService from './pokemonService';
import favoritesService, { Favorite } from './models/favorite';

type PokemonDto = {
  id: number;
  name: string;
  abilities: string[];
  types: string[];
  evolutions?: Evolution[];
  frontImage: string;
  backImage: string;
  isFavorite: boolean;
};

type Evolution = {
  name: string;
  image: string;
};

export const fetchAllPokemons: RequestHandler = async (req, res, next) => {
  try {
    const pokemonList = await pokemonService.getPokemonsList();
    res.status(200).json({ pokemonList: pokemonList.results });
  } catch (err) {
    next(err);
  }
};

export const fetchAllFavorites: RequestHandler = async (req, res, next) => {
  try {
    const pokemonList = await favoritesService.find();
    res.status(200).json({ pokemonList: pokemonList });
  } catch (err) {
    next(err);
  }
};

export const fetchPokemonInfo: RequestHandler = async (req, res, next) => {
  try {
    const { url } = req.query;

    if (!url?.length) {
      throw Error('Invalid url');
    }

    const pokemonInfo = await pokemonService.PokeApiRequest(url.toString());

    const pokeSpeciesUrl = pokemonInfo?.species?.url;
    let evolutions;
    if (pokeSpeciesUrl) {
      evolutions = await getPokemonEvolutions(pokeSpeciesUrl);
    }

    const isFavorite = await favoritesService.findOne({ pokeApiId: pokemonInfo.id });

    const pokemonDto = toPokemonDto(pokemonInfo, !!isFavorite, evolutions);
    res.status(200).json({ pokemonInfo: pokemonDto });
  } catch (err) {
    next(err);
  }
};

export const addToFavorites: RequestHandler = async (req, res, next) => {
  try {
    const { pokemon } = req.body;

    if (!!!pokemon) {
      throw Error('Invalid pokemon');
    }

    const newFavorite: Favorite = {
      pokeApiId: pokemon.id,
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
    };

    const createdFavorite = await favoritesService.create(newFavorite);

    res.status(200).json(createdFavorite);
  } catch (err) {
    next(err);
  }
};

export const removeFromFavorites: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;

    const deletedItem = await favoritesService.findOneAndDelete({ pokeApiId: id });

    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.status(200).json(deletedItem);
    }
  } catch (err) {
    next(err);
  }
};

const getPokemonEvolutions = async (speciesUrl: string) => {
  const speciesRes = await pokemonService.PokeApiRequest(speciesUrl);
  const evolutionChainRes = await pokemonService.PokeApiRequest(speciesRes?.evolution_chain?.url);

  const evolutions: Evolution[] = [];
  let currentItem = evolutionChainRes?.chain;
  let anotherEvolution = !!currentItem?.evolves_to?.length;
  while (anotherEvolution) {
    anotherEvolution = !!currentItem?.evolves_to?.length;

    let species = currentItem?.species;
    let urlParts = species.url.split('/');
    let pokemonInfo = await pokemonService.PokeApiRequest(
      `https://pokeapi.co/api/v2/pokemon/${urlParts[urlParts.length - 2]}`,
    );
    let evolutionItem: Evolution = {
      name: species.name,
      image: pokemonInfo.sprites?.front_default ?? '',
    };
    evolutions.push(evolutionItem);

    currentItem = currentItem?.evolves_to[0];
  }

  return evolutions;
};

const toPokemonDto = (pokemon: any, isFavorite: boolean, evolutions?: Evolution[]) => {
  const abilities = pokemon.abilities?.map((a: any) => a?.ability?.name) ?? [];
  const types = pokemon.types?.map((t: any) => t?.type?.name) ?? [];

  const dto: PokemonDto = {
    id: pokemon.id ?? 0,
    name: pokemon.name ?? '',
    abilities,
    types,
    evolutions,
    isFavorite,
    frontImage: pokemon.sprites?.front_default ?? '',
    backImage: pokemon.sprites?.back_default ?? '',
  };
  return dto;
};
