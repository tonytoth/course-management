const fizzbuzz = (inputNumber: number) => {
  if (inputNumber < 1) {
    throw new Error('Value should be grater or equal to 1.');
  }

  if (inputNumber > 100) {
    throw new Error('Value should be less or equal to 100.');
  }

  let outputString = '';

  if (inputNumber % 3 === 0) {
    outputString += 'Fizz';
  }

  if (inputNumber % 5 === 0) {
    outputString += 'Buzz';
  }

  if (outputString === '') {
    outputString = inputNumber.toString();
  }

  return outputString;
};

export { fizzbuzz };
