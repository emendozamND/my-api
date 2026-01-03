const faker = require("faker");

const getAllProducts = (req, res) => {
    const limit = Number(req.query.limit ?? 10);   // default 10
    const offset = Number(req.query.offset ?? 0);  // default 0

    if (!Number.isFinite(limit) || !Number.isFinite(offset) || limit < 1 || offset < 0) {
        // return res.status(400).json({ error: "Parámetros inválidos. Usa ?limit=10&offset=0" });
    }

    const products = [];

    for (let i = 0; i < limit; i++) {
        const id = offset + i + 1;
        products.push({
            id,
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            image: faker.image.imageUrl(),
        });
    }

    return products;
};

const createnewProduct = (req, res) => {
    const body = req.body;
    console.log(body); // ✅ body (no bodye)
    res.json({
        ok: true,
        data: body,
    });
};
const deleteProduct = (req, res) => {
    const { id } = req.params;
    res.json({
        message: "delete",
        id,
    });
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: "success",
        product: body,
        id,
    });
};

const getOneProduct = (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: "Teclado",
        price: 2000,
        category: "technology",
    });
};
module.exports = {
    getAllProducts,
    createnewProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
};
