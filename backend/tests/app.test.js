import request from "supertest";
import app from "../src/index.js";

describe("API Tests", () => {
  test("GET /api/posts should return list of posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/posts without data should return 400", async () => {
    const res = await request(app).post("/api/posts").send({});
    expect(res.statusCode).toBe(400);
  });
});
