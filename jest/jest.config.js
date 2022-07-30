module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', 'setup.ja'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|react-native-image-colors|@react-native-community|@react-navigation|jpg|png',
  ],
};