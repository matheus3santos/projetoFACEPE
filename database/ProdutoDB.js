const crypto = require('crypto')
const AWS = require('aws-sdk')
//AWS.config.update(AWSConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
// Set the region 
AWS.config.update({region: 'us-east-1'});

const tableName = 'produto';


async function salvar(bodyRequest){
    
    bodyRequest.id = crypto.randomBytes(32).toString('hex');
    bodyRequest.ativo = true;
    bodyRequest.dataCadastro = new Date().toString();

    var params = {
        TableName: tableName,
        Item: bodyRequest

    };

    try{
        await dynamodb.put(params).promise();
    }catch(erro){
        console.log('erro',erro)
        return null
    }
}

async function remover(id) {
    var params = {
        TableName: tableName,
        Key: {
            id: id
        }
    }

    try{
        await dynamodb.delete(params).promise();
        return true

    }catch(erro){
        console.log('erro',erro);
        return false;

    }
}

async function buscarPorCategoria(categoria){
    var params = {
        TableName: tableName,
        FilterExpression: "categoria = :categoria",
        ExpressionAttributeValues: {
            ":categoria": categoria
        }

        }
    
    try{
        const dados = await dynamodb.scan(params).promise();
        return dados.Items
    }catch(erro){
        console.log('erro',erro);
        return null;
    }
}

async function alterar(produto){
    var params = {
        TableName: tableName,
        Key: {id: produto.id},
        UpdateExpression: "set nome = :nome, descricao = :descricao, categoria = :categoria",
        ExpressionAttributeValues: {
            ":nome": produto.nome,
            ":descricao": produto.descricao,
            ":categoria": produto.categoria
        },
        ReturnValues: "UPDATED_NEW"

    };

    try{
        const dados = await dynamodb.update(params).promise();
        return dados.Items;
    } catch(erro){
        console.log('Update',erro)
    }
}

async function buscarTodosProdutos() {
    try {
        const produtos = await dynamodb.scan({ TableName: tableName }).promise();
        return produtos.Items
    } catch (erro) {
        console.log('erro', erro);
        return null;
    }
}


module.exports = {
    salvar,
    remover,
    alterar,
    buscarPorCategoria,
    buscarTodosProdutos
}