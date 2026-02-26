/**
 * Converted from jest.config.ts to avoid requiring ts-node on CI/windows
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@auth/(.*)$": "<rootDir>/src/auth/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@assets/images/(.*)\.(jpg|jpeg|png|svg)$": "<rootDir>/jest.fileMock.js",
    "^@assets/icons-svg/(.*)\.(svg)$": "<rootDir>/jest.fileMock.js",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/jest.fileMock.js",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
};
