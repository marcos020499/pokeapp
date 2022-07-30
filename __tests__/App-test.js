import React from 'react';
import configureStore from 'redux-mock-store';
import {
  render,
  fireEvent,
  screen,
  cleanup,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../src/redux/store';
import {Provider} from 'react-redux';
import HomeScreen from '../src/pages/HomeScreen';
import Details from '../src/components/Details';
import {takeEvery, put} from 'redux-saga/effects';
import {pokemonsSaga, workGetPokemonsFetch} from '../src/redux/sagas/sagas';
import pokemonsSlice from '../src/redux/reducers/reducer';
import getPokemonsSucess from '../src/redux/reducers/reducer'
describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  test('Home', async () => {
    const mockStore = configureStore([]);
    const store = mockStore();
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>
    );
    render(component);
    const header = await screen.findByText('POKEDEX');
    expect(header).toBeTruthy();
  });
  test.skip('clicking on one item takes you to the details screen', async () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>
    );
    render(component);
    const toClick = await screen.findByTestId('press');
    fireEvent(toClick, 'press');
    const newBody = await screen.findByText('bulbasaur');
    expect(newBody).toBeTruthy();
  });
  test('Details screenn', async () => {
    const mockedParams = {
      route: {
        params: {
          simplePokemon: 'simplePokemon',
          color: 'color',
          picture: 'picture',
          id: 'id',
        },
      },
      navigation: '',
    };
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Details {...mockedParams} />
        </NavigationContainer>
      </Provider>
    );
    render(component);
    const header = await screen.findByText('Peso');
    expect(header).toBeTruthy();
  });
  test('redux sagas', () => {
    const generator = pokemonsSaga;
    'should wait for every FETCH_Pokemons',
      () => {
        expect(generator.next().value).toEqual(
          takeEvery('pokemons/getPokemonsFetch', workGetPokemonsFetch),
        );
      };
    'should be done on next iteration',
      () => {
        expect(generator.next().done).toBeTruthy();
      };
  });
  test('should return initial state', () => {
    const initialState = {
      pokemons: [],
      pokemonDetails: [],
      isLoading: false,
    };
    expect(pokemonsSlice(undefined, {}))?.toEqual(initialState);
  });
  test('displays data when ready', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
      {
        initialState: {
          pokemons: [],
        },
      },
    );
    expect(getByText('Busca un pokemon por su nombre')).toBeTruthy();
  });
  test('Should initially pokemons to an empty object', () => {
    const state = store.getState().pokemons;
    expect(state.pokemons)?.toEqual([]);
  });
});
