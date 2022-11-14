import {validateStringNotEmpty,validateNumber} from './validation'
export function transformToNumber(value) {
  // return NaN
  return +value;
}

export function cleanNumber(numberValues) {
  const numbers = [];
  for (const numberInput of numberValues) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);

  }
  return numbers;
}
