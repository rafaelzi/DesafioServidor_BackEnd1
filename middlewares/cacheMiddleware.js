const express = require('express');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();

// Middleware de caching
function cacheMiddleware(req, res, next) {
    // Usando a URL como chave de cache
    const chave = req.originalUrl;
    // Tenta obter os dados do cache
    const dadosCache = cache.get(chave);

    if (dadosCache !== undefined) {
        // Envia a resposta com os dados do cache, se existirem
        console.log("Dados recuperados do cache para a URL:", chave);
        res.send(dadosCache);
    } else {
        // Continua com a próxima função de middleware
        console.log("Dados não encontrados no cache para a URL:", chave);
        const originalSend = res.send.bind(res);
        res.send = (body) => {
            cache.set(chave, body, 30); // Armazenar a resposta no cache por 30 segundos
            originalSend(body);
        };
        next();
    }
}


module.exports = cacheMiddleware;