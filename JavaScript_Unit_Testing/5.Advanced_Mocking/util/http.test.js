import { it, expect, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

const testRespondeData = { testKey: "testdata" };

const testFetch = vi.fn((url, options) => {
    if (typeof options.body !== 'string') {
        return reject('Not a string');
    }
    return new Promise((resolve, reject) => {
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testRespondeData);
                });
            },
        };
        resolve(testResponse);
    });
}
);

vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
    const testData = { key: "test" };

    return expect(sendDataRequest(testData)).resolves.toEqual(testRespondeData);
});

it("should convert the provided data to JSON before sending the request", async () => {
    const testData = { key: "test" };
    let errorMessage;

    try {
        await sendDataRequest(testData)
    } catch (error) {
        errorMessage = error;
    }
    return expect(errorMessage).not.toBe('Not a string.');
});

it("should throw an HttpError in case of non-ok responses", () => {

    testFetch.mockImplementationOnce((url, options) => {

        return new Promise((resolve, reject) => {
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((resolve, reject) => {
                        resolve(testRespondeData);
                    });
                },
            };
            resolve(testResponse);
        });
    })
    const testData = { key: "test" };

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);


});
