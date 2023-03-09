const express = require("express");
const app = express();
const PORT = 4000;
const usuarioRoute = require('./routes/usuarioRoute')
const produtoRoute = require('./routes/produtoRouter')
const cors = require('cors')

//INICIAR SERVIDOR "npm start"

app.use(cors({ origin: '*'}))
app.use(express.json());
app.use('/usuario', usuarioRoute);
app.use('/produto', produtoRoute);



app.listen(PORT, () => console.log('Servidor rodando na porta ' + PORT))


