const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

const secret = '1234'; 

router.post('/', function(req, res, next) {
    // Aqui estamos simplificando o acesso ao banco de dados
    if (req.body.user === 'Rafael' && req.body.password === '1234') {
    // Utilizar informação relacionada ao usuário
    const token = jwt.sign({id: 1}, secret, {expiresIn: 300});
    return res.json({auth: true, token});
    }
    res.status(401).end();
   });

   module.exports = router;


function verifyJWT(req, res, next) {
 const token = req.headers['x-access-token'];
 jwt.verify(token, secret, (err, decoded) => {
 if (err) return res.status(401).end();
 req.id = decoded.id;
 next();
 })
}

router.get('/', verifyJWT, function(req, res, next) {
 console.log(req.id + ' fez esta requisição!');
 res.send('respond with a resource');
});

module.exports = router;