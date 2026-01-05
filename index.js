const express = require("express");
const { errorLogs, errorHandler } = require("./middleware/errorhandler");
const apiRouter = require("./server");

const app = express();
const port = 3000;

app.use(express.json());

apiRouter(app);

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.get("/help", (req, res) => {
  res.status(200).send("Hola desde help");
});

//  Los middlewares de error llevan  este orden:
app.use(errorLogs);
app.use(errorHandler);

//  Solo levantar servidor si se ejecuta directamente (npm run dev)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Puerto escuchando en el ${port}`);
  });
}

//  Exportar app para pruebas
module.exports = app;
