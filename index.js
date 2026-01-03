const express = require("express");
const apiRouter = require("./server");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hola mundo desde mi ruta raiz");
});

app.get("/help", (req, res) => {
    res.status(200).send("Hola desde help");
});

// monta todas tus rutas del API
app.use("/", apiRouter);

app.listen(port, () => {
    console.log(`Puerto escuchando en el ${port}`);
});