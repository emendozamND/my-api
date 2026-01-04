const faker = require("faker");

// GET /products?limit=10&offset=0
const getAllProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 20);

    // Validación de parámetros
    if (!Number.isFinite(limit) || !Number.isFinite(offset) || limit < 1 || offset < 0) {
      return res.status(400).json({
        ok: false,
        error: "Parámetros inválidos. Usa ?limit=10&offset=0",
      });
    }

    // Simulación de espera (opcional) para practicar async/await
    // await new Promise((resolve) => setTimeout(resolve, 50));

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

    return res.json({
      ok: true,
      limit,
      offset,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("getAllProducts error:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno al obtener productos",
    });
  }
};

// POST /products
const createnewProduct = async (req, res) => {
  try {
    const body = req.body;

    // Validación mínima (opcional)
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ ok: false, error: "Body vacío" });
    }

    console.log(body);
    return res.status(201).json({
      ok: true,
      message: "Producto creado",
      data: body,
    });
  } catch (error) {
    console.error("createnewProduct error:", error);
    return res.status(500).json({ ok: false, error: "Error interno al crear producto" });
  }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id) || id < 1) {
      return res.status(400).json({ ok: false, error: "ID inválido" });
    }

    return res.json({
      ok: true,
      message: "Producto eliminado",
      id,
    });
  } catch (error) {
    console.error("deleteProduct error:", error);
    return res.status(500).json({ ok: false, error: "Error interno al eliminar producto" });
  }
};

// PATCH /products/:id
const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    if (!Number.isFinite(id) || id < 1) {
      return res.status(400).json({ ok: false, error: "ID inválido" });
    }

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ ok: false, error: "Body vacío" });
    }

    return res.json({
      ok: true,
      message: "Producto actualizado",
      id,
      product: body,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    return res.status(500).json({ ok: false, error: "Error interno al actualizar producto" });
  }
};

// GET /products/:id
const getOneProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id) || id < 1) {
      return res.status(400).json({ ok: false, error: "ID inválido" });
    }

    // Simulación (en real: aquí iría tu consulta a BD)
    return res.json({
      ok: true,
      data: {
        id,
        name: "Teclado",
        price: 2000,
        category: "technology",
      },
    });
  } catch (error) {
    console.error("getOneProduct error:", error);
    return res.status(500).json({ ok: false, error: "Error interno al obtener producto" });
  }
};

module.exports = {
  getAllProducts,
  createnewProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
};
