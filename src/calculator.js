#!/usr/bin/env node

/**
 * Simple Node.js CLI calculator.
 *
 * Supports four basic math operations:
 *   - add      (addition:       a + b)
 *   - subtract (subtraction:    a - b)
 *   - multiply (multiplication: a * b)
 *   - divide   (division:       a / b, with divide-by-zero protection)
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 *
 * Example:
 *   node calculator.js add 5 3
 *   # Output: 8
 */

// Addition: returns the sum of two numbers.
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of two numbers.
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of two numbers.
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of two numbers.
// Throws an error if dividing by zero so it can be handled gracefully.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

const operations = {
  add,
  subtract,
  multiply,
  divide,
};

function printUsage() {
  console.log('Usage: node calculator.js <add|subtract|multiply|divide> <num1> <num2>');
  console.log('Example: node calculator.js add 5 3');
}

function main() {
  const [, , operation, rawA, rawB] = process.argv;

  if (!operation || rawA === undefined || rawB === undefined) {
    printUsage();
    process.exit(1);
  }

  const fn = operations[operation];
  if (!fn) {
    console.error(`Error: unknown operation "${operation}".`);
    printUsage();
    process.exit(1);
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both arguments must be valid numbers.');
    process.exit(1);
  }

  try {
    const result = fn(a, b);
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Only run the CLI when executed directly (not when imported/required elsewhere).
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide };
