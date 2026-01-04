const express = require("express");
const productServices = require("../services/services.Products");
const router = express.Router();

router.get("/", async (req, res) => {
    const products = await productServices.getAllProducts(req, res);

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

router.post("/", async (req, res) => {
    const createProduct = await productServices.createnewProduct(req, res)
    return createProduct

});
router.delete("/:id", async (req, res) => {
    const deleteProduct = await productServices.deleteProduct(req, res)
    return deleteProduct
})
router.patch("/:id", async (req, res) => {
    const updateProduct = await productServices.updateProduct(req, res)
    return updateProduct
});


router.get("/:id", async (req, res) => {
    const getOneProduct = await productServices.getOneProduct(req, res)
    return getOneProduct
});

module.exports = router;
