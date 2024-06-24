const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = '1234'; 

router.post('/', function(req, res, next) {
    const { user, password } = req.body;
    console.log('User:', user); 
    console.log('Password:', password); 
    if (user === 'Rafael' && password === '1234') {
        const token = jwt.sign({ id: 1 }, secret, { expiresIn: 300 });
        return res.json({ auth: true, token });
    }
    res.status(401).json({ message: 'Credenciais inválidas' });
});

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.id = decoded.id;
        next();
    });
}

router.get('/', verifyJWT, function(req, res, next) {
    console.log(req.id + ' fez esta requisição!');
    res.send('respond with a resource');
});

module.exports = router;
