const express = require("express");
const faker = require("faker");
const router = express.Router()

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        name: "Teclado",
        price: 2000,
        category: "technology",
    });
});
module.exports = router;