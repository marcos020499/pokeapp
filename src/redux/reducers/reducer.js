import {createSlice, createAction} from '@reduxjs/toolkit';

export const counterItems = createAction('counter/items');
export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
    pokemonDetails: [],
    isLoading: false,
  },
  reducers: {
    getPokemonsFetch: (state, action) => {
      state.isLoading = true;
    },
    getPokemonsSucess: (state, action) => {
      state.pokemons = action.payload.results;
      state.isLoading = false;
    },
    getPokemonsFailure: state => {
      state.isLoading = false;
    },
    getPokemonDetails: (state, action) => {
      state.pokemonDetails = action.payload;
    },
  },
});
export const {
  getPokemonsFailure,
  getPokemonsFetch,
  getPokemonsSucess,
  getPokemonDetails,
} = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
