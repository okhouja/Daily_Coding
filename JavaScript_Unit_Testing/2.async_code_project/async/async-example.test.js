import { it, expect } from "vitest";

import { generateToken } from "./async-example";

// it("should generate a token value", (done) => {
it("should generate a token value", () =>
  new Promise((resolve, reject) => {
    const email = "test@email.fake";

    generateToken(email, (err, token) => {
      try {
        expect(token).toBeDefined()
        // expect(token).toBe(2);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }));
