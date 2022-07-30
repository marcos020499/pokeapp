jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({goBack: jest.fn()}),
  useRoute: () => ({
    params: {
      simplePokemon: 'simplePokemon',
      color: 'color',
      picture: 'picture',
    },
  }),
}));
