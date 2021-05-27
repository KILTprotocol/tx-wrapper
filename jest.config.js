module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./test/jest.setup-file.ts"],
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "ts"],
};
