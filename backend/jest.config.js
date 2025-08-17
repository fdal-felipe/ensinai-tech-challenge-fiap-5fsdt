/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  setupFiles: ['./tests/setup.js'],
  testTimeout: 10000,
};

module.exports = config;