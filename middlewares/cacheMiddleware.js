const NodeCache = require('node-cache');
const cache = new NodeCache();

// Middleware de caching
function cacheMiddleware(req, res, next) {
    const chave = req.originalUrl;

    if (req.method === 'GET') {
        const dadosCache = cache.get(chave);
        if (dadosCache !== undefined) {
            console.log(`Cache hit: ${chave}`);
            return res.send(dadosCache);
        } else {
            console.log(`Cache miss: ${chave}`);
            const originalSend = res.send.bind(res);
            res.send = (body) => {
                cache.set(chave, body, 30); // Armazenar a resposta no cache por 30 segundos
                originalSend(body);
            };
            next();
        }
    } else if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        console.log('Cache limpo devido a uma operação de escrita.');
        cache.flushAll();
        next();
    } else {
        next();
    }
}

module.exports = cacheMiddleware;
module.exports.cache = cache;