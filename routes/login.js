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