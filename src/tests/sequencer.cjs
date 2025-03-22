/* eslint-disable @typescript-eslint/no-require-imports */
const TestSequencer = require('.pnpm/@jest+test-sequencer@29.7.0/node_modules/@jest/test-sequencer').default;
const path = require('path');

const JEST_TESTS = process.env.JEST_TESTS;

let prioritizedFirstTests = [];
let prioritizedLastTests = [];

switch (JEST_TESTS) {
  case 'first':
    prioritizedFirstTests = [
      path.join(__dirname, 'first', 'tests-run.test.js')
    ];
    break;
  case 'last':
    prioritizedLastTests = [
      path.join(__dirname, 'last', 'tests-run.test.js')
    ];
    break;
  case 'all':
    prioritizedFirstTests = [
      path.join(__dirname, 'first', 'tests-run.test.js')
    ];
    prioritizedLastTests = [
      path.join(__dirname, 'last', 'tests-run.test.js')
    ];
    break;
  default:
    break;
}

/**
 * If contains at least one - it will be only one to run
 */
const onlyRunTests = [
  // ...prioritizedFirstTests,
  // ...prioritizedLastTests,
  // path.join(__dirname, 'sequential', 'controllers', 'template.test.js')
];

/**
 * Excludes tests
 */
const excludeTests = [
  // path.join(__dirname, 'sequential', 'controllers', 'node.test.js'),
];

/**
 * Sorts tests, running prioritizedFirstTests first, prioritizedLastTests last
 */
class CustomSequencer extends TestSequencer {
  sort(tests) {
    let orderedTests = [];

    for (const prioritizedFirstTest of prioritizedFirstTests) {
      const foundTest = tests.find(t => t.path === prioritizedFirstTest);
      if (!foundTest) continue;
      orderedTests.push(foundTest);
    }

    for (const test of tests) {
      if (
        !prioritizedFirstTests.includes(test.path) &&
        !prioritizedLastTests.includes(test.path)
      ) orderedTests.push(test);
    }

    for (const prioritizedLastTest of prioritizedLastTests) {
      const foundTest = tests.find(t => t.path === prioritizedLastTest);
      if (!foundTest) continue;
      orderedTests.push(foundTest);
    }

    for (const test of excludeTests) {
      orderedTests = orderedTests.filter(t => t.path !== test);
    }

    if (onlyRunTests.length > 0) {
      return orderedTests.filter(test => onlyRunTests.includes(test.path));
    } else {
      return orderedTests;
    }
  }
}

module.exports = CustomSequencer;
