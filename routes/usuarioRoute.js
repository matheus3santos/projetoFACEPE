const express = require('express');
const router = express.Router()
const { salvar,remover,alterar,buscarPorEmailSenha, buscaPorEmail } = require('../database/UsuarioDB')
const { validarJWT, gerarTokenJwt} = require('../utils/jwt')


function validarRequestBody(request){

    return request.body && request.body.id && request.body.email;

}


//Cadastrar um novo usuario
router.post('/', async(req,res)=>{
    if(req.body && req.body.email && req.body.nome && req.body.senha) {
        const cadastro = await salvar(req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({mensagem:'Usuario não cadastrado'})
});

//Deletar um usuario
router.delete('/', async (req,res)=>{
    if(validarRequestBody(req)){
        const sucesso = await remover(req.body.id, req.body.email);
        return res.send({sucesso: sucesso});
    }
    return res.status(404).json({mensagem: 'Usuario não encontrado'});
});

//Buscar usuario por email
router.get('/', validarJWT, async (req, res) => {
    const dados = await buscaPorEmail(req.body.email);
    if (dados) {
        return res.send(dados);
    }

    return res.status(404).json({mensagem: "Usuário não encontrado"});
});


//Editar usuario
router.put('/',validarJWT, async(req,res) =>{
    
    if(validarRequestBody(req)){
        const dados = await alterar(req.body);
        return res.send(dados)
        //return res.json({mensagem:"Alterado com sucesso"})
    }

    return res.status(404).json({mensagem: "Usuario não encontrado."})

});

//Fazer o login do usuario e gerar token.
router.post('/login', async(req,res) => {
    const dados = await buscarPorEmailSenha(req.body.email, req.body.senha);

    if (dados) {
        const token = gerarTokenJwt(dados.id);
        dados.token = token;
        dados.auth = true
        return res.send(dados);

    }

    return res.status(404).json({mensagem:"Usuario não cadastrado."})

});




module.exports = router;
