import axios, { AxiosInstance } from 'axios';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';
const FETCH_LIMIT = 150;

class PokemonService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  public async getPokemonsList() {
    try {
      const url = `${POKE_API_BASE_URL}/pokemon?offset=0&limit=${FETCH_LIMIT}`;
      return this.client.get(url).then(res => res.data);
    } catch (error) {
      console.log('~ PokemonService ~ getPokemonList ~ error:', error);
      return;
    }
  }

  public async PokeApiRequest(pokeUrl: string) {
    try {
      return this.client.get(pokeUrl).then(res => res.data);
    } catch (error) {
      console.log('~ PokemonService ~ PokeApiRequest ~ error:', error);
      return;
    }
  }
}

export default new PokemonService();
