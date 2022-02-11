import supertest from "supertest";
import app from "../../server";
// const finishTestcase = require("jasmine-supertest");

const request = supertest(app);

const imageNameArray = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

describe("API endpoints", () => {
  //This function was copied from the MDN Web Docs at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  let width: number;
  let height: number;
  let imageName: string;

  beforeEach(() => {
    width = getRandomInt(500, 1000);
    height = getRandomInt(500, 1000);
    imageName = imageNameArray[getRandomInt(0, imageNameArray.length)];
  });

  describe("resize endpoint", () => {
    it("makes successful GET request with correct query string", async () => {
      const response = await request.get(
        `/api?name=${imageName}&width=${width}&height=${height}`
      );
      console.log(response);
      expect(response.status).toBe(200);
    });
  });
});
