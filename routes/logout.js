const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = '1234'; // Chave secreta para assinar e verificar tokens

// Rota para fazer logout e invalidar o token
router.post('/', function(req, res, next) {
    const { user, password } = req.body;

    // Verifica se o usuário e a senha correspondem
    if (user === 'Rafael' && password === '1234') {
        // Aqui você pode adicionar lógica para invalidar o token,
        // como adicioná-lo a uma blacklist, por exemplo
        // Por simplicidade, vou apenas retornar uma mensagem de sucesso
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    } else {
        // Caso as credenciais sejam inválidas, retorna status 401 (Não autorizado)
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

module.exports = router;