export default {
  testEnvironment: "jsdom",
  transform: {},
  moduleFileExtensions: ["js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  collectCoverageFrom: [
    "src/scripts/**/*.js",
    "!sw.js",
    "!src/scripts/timerDOM.js",
    "!src/scripts/timer.js",
    "!src/scripts/navigation.js",
    "!src/scripts/training.js",
    "!src/scripts/settingsDOM.js",
    "!src/scripts/barchartDOM.js",
    "!src/scripts/localStorage.js",
    "!src/scripts/overviewDOM.js",
    "!src/scripts/statsDisplayDOM.js",
    "!src/scripts/swCall.js",
    "!src/scripts/addTimeDOM.js"
  ],
  // Ignore service-worker file(s) from coverage reporting (they run in worker context)
  coveragePathIgnorePatterns: ["/sw\\.js$", "<rootDir>/sw.js"],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      functions: 80,
      branches: 80
    }
  }
};