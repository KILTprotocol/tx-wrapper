module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)'],
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
