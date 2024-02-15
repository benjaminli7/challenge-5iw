module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/react"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
