const express = require('express');
const router = express.Router();
const { validarJWT } = require('../utils/jwt');
const{ salvar, remover, alterar, buscarPorCategoria,buscarTodosProdutos } = require('../database/ProdutoDB');

//LEMBRETE: ENCONTRAM UMA FORMA DE VALIDAR A REQUISIÇÃO NO REACT POIS ELA ESTA BUGANDO
//SEM A VALIDAÇÃO DO JWT O APLICATIVO ESTÁ FUNCIONANDO NORMALMENTE


//CADASTRAR O PRODUTO
router.post('/', async(req,res)=>{
    if(validarRequestProduto(req)){
        const cadastro = await salvar(req.body)
        return res.send({cadastro: "Produto cadastrado."});
    }

    return res.status(500).json({mensagem:"Produto não cadastrado."})
})

//DELETAR O PRODUTO
router.delete('/:id', async(req,res)=>{
    if(req.params.id){
        const sucesso = await remover(req.params.id);
        return res.send({sucesso: "Produto deletado"})
    }

    return res.status(404).json({mensagem:'Produto não encontrado.'})

})

//BUSCAR O PRODUTO PELA CATEGORIA
router.get('/buscarPorCategoria', validarJWT, async(req,res)=>{
    if(!req.body|| !req.body.categoria){
        return res.status(404).json({mensagem: "Digite a categoria: "});

    }

    const dados = await buscarPorCategoria(req.body.categoria);

    if(dados){
        return res.send(dados);
    }

    return res.status(404).json({mensagem: "Produto não encontrado."});
    
})

//EDITAR PRODUTOS
router.put('/', async(req,res)=>{

    if(validarRequestProduto(req) && req.body.id){
        const dados = await alterar(req.body);
        return res.json({mensagem:"Alterado com sucesso."});
    }

    return res.status(404).json({mensagem: "Produto não encontrado."})
});

//EXIBIR TODOS OS PRODUTOS CADASTRADOS
router.get('/', async (req, res) => {
    const produtos = await buscarTodosProdutos();
    
    if (!produtos) {
        return res.status(404).json({ mensagem: "Produtos não encontrados!" });

    }

    return res.send(produtos);
})

function validarRequestProduto(request){
    return request.body && request.body.nome && request.body.descricao && request.body.categoria;
}

module.exports = router;