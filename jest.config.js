module.exports = {
  setupFiles: ['./tests/setup.js'],

  moduleFileExtensions: [
    'js',
    'vue',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
  },

  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(vuetify)/)",
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    'vuetify/lib(.*)': '<rootDir>/node_modules/vuetify/es5$1',
  },
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ["**/src/**/*.test.js"],
};
