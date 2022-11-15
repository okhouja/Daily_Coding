import { describe, it, expect } from "vitest";

import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should transform a string numbers to number of type number", () => {
    const input = "1"; // will pass
    // const input = 'invalid';  // will pass too

    const result = transformToNumber(input);

    expect(result).toBeTypeOf("number");
  });

  it("should transform a string numbers to number of type number", () => {
    const input = "1"; // will pass

    const result = transformToNumber(input);

    expect(result).toBe(+input);
  });

  it("should yield Nan for non-transformable values", () => {
    const input = "invalid";
    const input2 = {};

    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);

    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });

  it("should yield NaN if no value is passed into the function", () => {
    const result = transformToNumber();

    expect(result).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];
    const cleanedNumber = cleanNumbers(numberValues);

    // expect(cleanedNumber[0]).toBeTypeOf("number");
    expect(cleanedNumber).toEqual([1,2]) // toBe
  });

  it("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", "1"];
    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
