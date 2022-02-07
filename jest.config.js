module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  jest: {
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
    moduleFileExtensions: [
      "js",
      "json",
      // tell Jest to handle `*.vue` files
      "vue",
    ],
    transform: {
      // process `*.vue` files with `vue-jest`
      ".*\\.(vue)$": "vue-jest",
    },
  },
  testMatch: [
    "!**/__tests__/**/*.fixtures.[jt]s?(x)",
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
