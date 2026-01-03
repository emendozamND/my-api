const express = require("express");
const productServices = require("../services/services.Products");
const router = express.Router();

router.get("/", (req, res) => {
    const products = productServices.getAllProducts(req, res);

    // si quieres devolver limit/offset aquí, los tienes que leer aquí también:
    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 0);

    res.json({
        limit,
        offset,
        count: products.length,
        data: products,
    });
});

router.post("/", (req, res) => {
    productServices.createnewProduct(req, res);
    res.json('updateProduct').send('producto actualizado');

});
router.delete("/:id", (req, res) => {
    productServices.deleteProduct(req, res);
})
router.patch("/:id", (req, res) => {
    const updateProduct = productServices.updateProduct(req, res);
});

router.delete("/:id", (req, res) => {
    productServices.deleteProduct(req, res);
});

router.get("/:id", (req, res) => {
    productServices.getOneProduct(req, res);
});

module.exports = router;
