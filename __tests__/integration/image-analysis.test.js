const { describe, it, expect } = require("@jest/globals");
const validRequestMock = require("../mocks/valid-request.json");
const emptyUrlRequestMock = require("../mocks/empty-image-url-request.json");
const invalidUrlRequestMock = require("../mocks/invalid-image-url-request.json");
const { main } = require("../../src");

describe("Image analyser test suite", () => {
  it("Should analyse successfuly the image returning the results", async () => {
    const expected = {
      statusCode: 200,
      body: "Animal e canino e cão e mamífero e animal de estimação e cachorrinho e grama e planta e Golden Retriever e gramado",
    };

    const result = await main(validRequestMock);
    expect(result).toStrictEqual(expected);
  });

  it("Should return status code 400 when given an empty queryString", async () => {
    const expected = {
      statusCode: 400,
      body: "Image URL is required",
    };

    const result = await main(emptyUrlRequestMock);
    expect(result).toStrictEqual(expected);
  });

  it("Should return status code 500 when given an invalid image URL", async () => {
    const expected = {
      statusCode: 500,
      body: "Internal server error",
    };

    const result = await main(invalidUrlRequestMock);
    expect(result).toStrictEqual(expected);
  });
});
