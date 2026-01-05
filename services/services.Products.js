const faker = require("faker");
const boom = require('@hapi/boom')
const { v4: uuidv4 } = require("uuid");
// GET /products?limit=10&offset=0
const getAllProducts = async (req, res) => {
    try {

        const limit = Number(req.query.limit ?? 10);
        const offset = Number(req.query.offset ?? 10);

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
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ ok: false, error: "Body vacío" });
  }

  const newProduct = { id: uuidv4(), ...body };

  return res.status(201).json({
    ok: true,
    message: "Producto creado",
    data: newProduct,
  });
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // string

    if (!id) {
      return res.status(400).json({ ok: false, error: "ID inválido" });
    }

    // (Opcional) Validar formato UUID (v4 o genérico)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({ ok: false, error: "ID no es UUID válido" });
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
    const { id } = req.params; // string UUID
    const body = req.body;

    if (!id) {
      return res.status(400).json({ ok: false, error: "ID inválido" });
    }

    // (Opcional) validar que sea UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({ ok: false, error: "ID no es UUID válido" });
    }

    const updated = { id, ...body };

    return res.json({
      ok: true,
      message: "Producto actualizado",
      data: updated,
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
