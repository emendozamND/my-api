const express = require("express");
const productServices = require("../services/services.Products");
const router = express.Router();

const validatorHandler = require("../middlewares/validatorHandler");
const {
  schemaProductCreate,
  updateSchemaProduct,
  getProductSchema,
} = require("../schema/schemaProduct.js");

// GET /api/v1/products?limit=10&offset=0
router.get("/", async (req, res, next) => {
  try {
    await productServices.getAllProducts(req, res);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/products
router.post(
  "/",
  validatorHandler(schemaProductCreate, "body"),
  async (req, res, next) => {
    try {
      await productServices.createnewProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/v1/products/:id
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      await productServices.getOneProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/v1/products/:id
router.patch( "/:id",  validatorHandler(getProductSchema, "params"),
  
  async (req, res, next) => {
    try {
      await productServices.updateProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/v1/products/:id
router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      await productServices.deleteProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
