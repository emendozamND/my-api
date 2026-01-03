const express = require("express");
const app = express();
const faker = require("faker");
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hola mundo desde mi ruta raiz");
});

app.get("/help", (req, res) => {
    res.status(200).send("Hola desde help");
});

app.get("/products", (req, res) => {
    const limit = Number(req.query.limit ?? 10);   // default 10
    const offset = Number(req.query.offset ?? 0);  // default 0

    if (!Number.isFinite(limit) || !Number.isFinite(offset) || limit < 1 || offset < 0) {
        return res.status(400).json({ error: "Parámetros inválidos. Usa ?limit=10&offset=0" });
    }

    const products = [];

    for (let i = 0; i < limit; i++) {
        const id = offset + i + 1; // genera IDs “fake” pero consistentes
        products.push({
            id,
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            image: faker.image.imageUrl(),
        });
    }

    res.json({
        limit,
        offset,
        count: products.length,
        data: products,
    });
});

app.get("/users", (req, res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    if (!Number.isFinite(limit) || !Number.isFinite(offset)) {
        return res.status(400).json({ error: "Faltan parámetros o no son números: limit, offset" });
    }

    res.json({ limit, offset });
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        name: "Teclado",
        price: 2000,
        category: "technology",
    });
});

app.listen(port, () => {
    console.log(`Puerto escuchando en el ${port}`);
});
