import { assert } from "console";
import { it, expect } from "vitest";

import { generateToken, generateTokenPromise } from "./async-example";

// it("should generate a token value", (done) => {
it("should generate a token value", () =>
  new Promise((resolve, reject) => {
    const email = "test@email.fake";

    generateToken(email, (err, token) => {
      try {
        expect(token).toBeDefined();
        // expect(token).toBe(2);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }));

it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";

  const token = await generateTokenPromise(testUserEmail);

  return expect(token).toBeDefined();
});
