module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native-community|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-redux|reactotron-react-native|reactotron-core-client|reactotron-redux|react-native-dotenv|@react-native))',
  ],
  moduleNameMapper: {
    '^\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  cacheDirectory: '.jest/cache',
};
