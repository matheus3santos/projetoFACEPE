const crypto = require('crypto')
var AWS = require('aws-sdk');
const { encrypt,decrypt,getSenhaDecrypt } = require('../utils/crypto');
 
// Set the region 
AWS.config.update({region: 'us-east-1'});
// Nome da tabela que está usando para criação dos usuarios
const tableName = "user" ;
//AWS.config.update(AWSConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


async function salvar(bodyRequest){

    const senhaEncrypt = encrypt(bodyRequest.senha);
    bodyRequest.id = crypto.randomBytes(32).toString('hex');
    bodyRequest.senha = senhaEncrypt;
    bodyRequest.ativo = true;
    bodyRequest.dataCadastro = new Date().toString();

    var params = {
        TableName : tableName,
        Item : bodyRequest
    };

    try{
        await dynamodb.put(params).promise();
        return bodyRequest;
    }catch (erro) {
        console.log('Erro', erro);
        return null;
    }
}

async function remover(id,email){
    var params = {
        TableName: tableName,
        Key:{
            id: id,
            email: email
        }
    };

    try{
        await dynamodb.delete(params).promise();
        return true;
    }catch (erro) {
        console.log('Erro', erro);
        return null;
    }
}

async function alterar(usuario){
    var params = {
        TableName: tableName,
        Key:{"id" : usuario.id,"email" : usuario.email},
        UpdateExpression: "set nome = :nome",
        ExpressionAttributeValues: {
            ":nome":usuario.nome
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const dados = await dynamodb.update(params).promise();
        return dados;
    }catch(erro){
        console.log('Erro',erro)
    }
}

async function buscarPorEmailSenha(email,senha){
    try{
        var params = {
            TableName: tableName,
            FilterExpression:"email = :email",
            ExpressionAttributeValues:{
                ":email": email
            }
        }

        const dados = await dynamodb.scan(params).promise();

        if(dados && dados.Items){
            const usuario = dados.Items[0];
            const senhaDecrypt = getSenhaDecrypt(usuario.senha);
            return(senha === senhaDecrypt) ? usuario : null;
        }
        return null;

    }catch(erro){
        console.log('Erro',erro);
    }
}

async function buscaPorEmail(email) {
    try {
        var params = {
            TableName: tableName,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }

        const dados = await dynamodb.scan(params).promise();
        return dados.Items[0];
    } catch (erro) {
        console.log('erro', erro);
        return null;
    }
}


module.exports = {
    salvar,
    remover,
    alterar,
    buscarPorEmailSenha,
    buscaPorEmail
}