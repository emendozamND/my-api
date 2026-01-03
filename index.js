const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Hola mundo desde mi ruta raiz')
})
app.get('/help', (req, res) => {
    res.status(200).send('Hola desde help')
})
app.get('/products', (req, res) => {
    res.json({
        'name': 'Teclado',
        price: 2000,
        'category': 'tecnology'
    })
})
app.get('/products/:id', (req, res) => {
    const { id } = req.params
    console.log(req.params)
    res.json({
        'id': id,
        'name': 'Teclado',
        price: 2000,
        'category': 'tecnology'
    })
})
app.listen(port, (req, res) => {
    console.log("Puerto escuchando en el ${port}")
})