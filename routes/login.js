const express = require('express');
const router = express.Router();

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