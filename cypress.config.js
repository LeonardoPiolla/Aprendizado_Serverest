const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      API_URL: process.env.API_URL,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
