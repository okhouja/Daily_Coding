import { it, expect } from "vitest";

import { transformToNumber } from './numbers'

it('should transform a string numbers to number of type number', () => {
    const input = '1';  // will pass
    // const input = 'invalid';  // will pass too


    const result = transformToNumber(input)

    expect(result).toBeTypeOf('number')
})

it('should transform a string numbers to number of type number', () => {
    const input = '1';  // will pass

    const result = transformToNumber(input)

    expect(result).toBe(+input)
})

it('should yield Nan for non-transformable values', () => {
    const input = 'invalid'
    const input2 = {}

    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);


    expect(result).toBeNaN();
    expect(result2).toBeNaN();
})

it('should yield NaN if no value is passed into the function', () => {
    const result = transformToNumber();

    expect(result).toBeNaN();
});