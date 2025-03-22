/** @type {import('jest').Config} */

const JEST_TESTS = process.env.JEST_TESTS;
const IS_PIPELINED = process.env.IS_PIPELINED === 'true';

const commonConfig = {
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\.tsx?$': ['ts-jest',{}],
    '\\.[jt]sx?$': 'babel-jest',
  },
  modulePaths: ['src'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^root(.*)$': '<rootDir>$1',
    '^server(.*)$': '<rootDir>/src/server$1',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  testTimeout: IS_PIPELINED ? 60000 : 10000,
  // detectOpenHandles: true // uncomment this if needed to debug
};

const firstTestsConfig = {
  ...commonConfig,
  maxWorkers: 1,
  testSequencer: './src/tests/sequencer.cjs',
  testMatch: [ '**/src/**/?(*.)+(spec_first|test_first).[jt]s?(x)' ]
};

const sequentialTestsConfig = {
  ...commonConfig,
  maxWorkers: 1,
  testSequencer: './src/tests/sequencer.cjs',
  testMatch: [ '**/src/**/?(*.)+(spec_seq|test_seq).[jt]s?(x)' ]
};

const parallelTestsConfig = {
  ...commonConfig,
  testMatch: [ '**/src/**/?(*.)+(spec_par|test_par|spec|test).[jt]s?(x)' ]
};

const lastTestsConfig = {
  ...commonConfig,
  maxWorkers: 1,
  testSequencer: './src/tests/sequencer.cjs',
  testMatch: [ '**/src/**/?(*.)+(spec_last|test_last).[jt]s?(x)' ]
};

const allInOneRunTestsConfig = {
  ...commonConfig,
  maxWorkers: 1,
  testSequencer: './src/tests/sequencer.cjs',
  testMatch: [ '**/src/tests/**/?(*.)+(spec|test)*.[jt]s?(x)' ]
};

let config;

switch (JEST_TESTS) {
  case 'first':
    config = firstTestsConfig;
    break;
  case 'sequential':
    config = sequentialTestsConfig;
    break;
  case 'parallel':
    config = parallelTestsConfig;
    break;
  case 'last':
    config = lastTestsConfig;
    break;
  case 'all':
    config = allInOneRunTestsConfig;
    break;
  default:
    config = allInOneRunTestsConfig;
    break;
}

module.exports = config;
