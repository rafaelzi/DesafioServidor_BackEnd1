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

    // Função para limpar o cache
    const clearCache = () => {
        console.log("Cache limpo devido a uma operação de escrita.");
        cache.flushAll();
    };

    if (req.method === 'GET') {
        const dadosCache = cache.get(chave);
        if (dadosCache !== undefined) {
            console.log("Dados recuperados do cache para a URL:", chave);
            return res.send(dadosCache);
        } else {
            console.log("Dados não encontrados no cache para a URL:", chave);
            const originalSend = res.send.bind(res);
            res.send = (body) => {
                cache.set(chave, body, 30); // Armazenar a resposta no cache por 30 segundos
                originalSend(body);
            };
            next();
        }
    } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        clearCache();
        next();
    } else {
        next();
    }
}



module.exports = cacheMiddleware;