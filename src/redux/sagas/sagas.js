import {put, takeEvery, call, takeLatest} from 'redux-saga/effects';
import {getPokemonDetails, getPokemonsSucess} from '../reducers/reducer';
import 'isomorphic-fetch';
function* workGetPokemonsFetch(action) {
  const pokemons = yield call(() =>
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${action.payload.num}`),
  );
  const formattedPokemons = yield pokemons.json();

  yield put(getPokemonsSucess(formattedPokemons));
}
function* workGetPokemonDetails(action) {
  const pokemonDetails = yield call(() =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${action.payload.id}`),
  );
  const formattedPokemonDetails = yield pokemonDetails.json();
  yield put(getPokemonDetails(formattedPokemonDetails));
}
function* pokemonsSaga() {
  yield takeEvery('pokemons/getPokemonsFetch', workGetPokemonsFetch);
  yield takeLatest('pokemons/getPokemonDetails', workGetPokemonDetails);
}
export default pokemonsSaga;
