/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  setupFiles: ['./tests/setup.js'],
};

module.exports = config;