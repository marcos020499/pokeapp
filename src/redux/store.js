import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from './reducers/reducer';
import pokemonsSaga from './sagas/sagas';
const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
  middleware: [saga],
});
saga.run(pokemonsSaga);
