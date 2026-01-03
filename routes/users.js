const express = require("express");
const router = express.Router()

router.get("/users", (req, res) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    if (!Number.isFinite(limit) || !Number.isFinite(offset)) {
        return res.status(400).json({ error: "Faltan parámetros o no son números: limit, offset" });
    } else {
        res.send('No hay ningun parametro')
    }

    res.json({ limit, offset });
});
module.exports = router