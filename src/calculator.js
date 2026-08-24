#!/usr/bin/env node

/**
 * Simple Node.js CLI calculator.
 *
 * Supports the following math operations:
 *   - add        (addition:            a + b)
 *   - subtract   (subtraction:         a - b)
 *   - multiply   (multiplication:      a * b)
 *   - divide     (division:            a / b, with divide-by-zero protection)
 *   - modulo     (remainder:           a % b, with modulo-by-zero protection)
 *   - power      (exponentiation:      base ** exponent)
 *   - sqrt       (square root:         √n, with negative-input protection; single-argument operation)
 *
 * Usage:
 *   node calculator.js <operation> <num1> [num2]
 *
 * Example:
 *   node calculator.js add 5 3
 *   # Output: 8
 *
 *   node calculator.js sqrt 16
 *   # Output: 4
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

// Modulo: returns the remainder of a divided by b.
// Throws an error if dividing by zero so it can be handled gracefully.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

// Exponentiation: returns base raised to the power of exponent.
function power(base, exponent) {
  return base ** exponent;
}

// Square root: returns the square root of n.
// Throws an error for negative inputs, since the result would not be a real number.
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(n);
}

// Two-argument operations: fn(a, b).
const binaryOperations = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
};

// Single-argument operations: fn(a).
const unaryOperations = {
  sqrt: squareRoot,
};

function printUsage() {
  console.log('Usage: node calculator.js <operation> <num1> [num2]');
  console.log('Binary operations (require num1 and num2): add, subtract, multiply, divide, modulo, power');
  console.log('Unary operations (require only num1): sqrt');
  console.log('Example: node calculator.js add 5 3');
  console.log('Example: node calculator.js sqrt 16');
}

function main() {
  const [, , operation, rawA, rawB] = process.argv;

  if (!operation || rawA === undefined) {
    printUsage();
    process.exit(1);
  }

  const a = Number(rawA);
  if (Number.isNaN(a)) {
    console.error('Error: num1 must be a valid number.');
    process.exit(1);
  }

  let fn;
  let args;

  if (Object.prototype.hasOwnProperty.call(unaryOperations, operation)) {
    fn = unaryOperations[operation];
    args = [a];
  } else if (Object.prototype.hasOwnProperty.call(binaryOperations, operation)) {
    if (rawB === undefined) {
      printUsage();
      process.exit(1);
    }
    const b = Number(rawB);
    if (Number.isNaN(b)) {
      console.error('Error: num2 must be a valid number.');
      process.exit(1);
    }
    fn = binaryOperations[operation];
    args = [a, b];
  } else {
    console.error(`Error: unknown operation "${operation}".`);
    printUsage();
    process.exit(1);
  }

  try {
    const result = fn(...args);
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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
