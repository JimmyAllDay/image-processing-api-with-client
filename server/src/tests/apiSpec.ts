import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

xdescribe("API endpoint", () => {
  const baseURL = "localhost://5000";
  const width = 200;
  const height = 200;

  xit("tests that resize is called when passed all arguments", () => {});

  xdescribe("API Error handling", () => {
    // it('tests that no width parameter returns an error', ()=>{
    //     const response = await request.get("/api")
    //   expect(response).toThrow(expected value)
    // })
    // it('tests that no height parameter returns an error', ()=>{
    //     const response = await request.get("/api")
    //   expect(response).toThrow(expected value)
    // })
    // it('tests that an non-matching name parameter returns an error', ()=>{
    //     const response = await request.get("/api")
    //   expect(response).toThrow(expected value)
    // })
  });

  describe("API Responses", () => {
    it(`tests GET /api route`, async (done) => {
      const response = await request.get("/api");
      expect(response.status).toBe(200);
      done();
    });
  });
});
