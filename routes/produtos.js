const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Configurações de conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend-I-express-mysql-RafaelCabral',
    port: 3306
};

// Rota GET para buscar todos os produtos
router.get('/', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota GET para buscar um produto pelo ID
router.get('/:id', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota POST para adicionar um novo produto
router.post('/', async function (req, res, next) {
    const { nome, preco } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
        res.status(201).json({ message: 'Produto adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota PUT para atualizar um produto pelo ID
router.put('/:id', async function (req, res, next) {
    const { nome, preco } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, req.params.id]);
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota DELETE para excluir um produto pelo ID
router.delete('/:id', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;