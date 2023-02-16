const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const usuarioRoute = require('./routes/usuarioRoute')
const produtoRoute = require('./routes/produtoRouter')


app.use(bodyParser.json());
app.use('/usuario', usuarioRoute);
app.use('/produto',produtoRoute);



app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT))


