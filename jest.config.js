module.exports = {
  moduleFileExtensions: [
    'js',
    'vue',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ["**/src/**/*.test.js"],
};
