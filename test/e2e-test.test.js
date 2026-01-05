const request = require("supertest");
const app = require("../index");

describe("Suite de pruebas e2e para el curso", () => {
  it("esperamos un hola mundo", async () => {
    const res = await request(app).get("/");

    if (res.error) throw res.error;

    if (res.status !== 200) {
      throw new Error("Status incorrecto");
    }

    if (res.text !== "Hola Mundo") {
      throw new Error("Respuesta incorrecta");
    }
  });
});
