/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  clearMocks: true,

  collectCoverage: false,
  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/db/',
  ],

  coverageProvider: 'v8',

  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover',
  ],
  testRegex: "-spec.ts$",
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsConfigFile: 'tsconfig.json' }]
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  rootDir: '.',
  roots: [
    '<rootDir>/test',
  ],
};