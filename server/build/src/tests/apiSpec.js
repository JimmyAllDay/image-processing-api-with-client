"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
// const finishTestcase = require("jasmine-supertest");
const request = (0, supertest_1.default)(server_1.default);
const imageNameArray = [
    "encenadaport",
    "fjord",
    "icelandwaterfall",
    "palmtunnel",
    "santamonica",
];
describe("API endpoints", () => {
    //This function was copied from the MDN Web Docs at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    let width;
    let height;
    let imageName;
    beforeEach(() => {
        width = getRandomInt(500, 1000);
        height = getRandomInt(500, 1000);
        imageName = imageNameArray[getRandomInt(0, imageNameArray.length)];
    });
    describe("resize endpoint", () => {
        it("makes successful GET request with correct query string", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api?name=${imageName}&width=${width}&height=${height}`);
            console.log(response);
            expect(response.status).toBe(200);
        }));
    });
});
