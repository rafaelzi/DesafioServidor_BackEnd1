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

// Rota GET para buscar todos os clientes
router.get('/', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota GET para buscar um cliente pelo ID
router.get('/:id', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota POST para adicionar um novo cliente
router.post('/', async function (req, res, next) {
    const { nome, email } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('INSERT INTO clientes (nome, email) VALUES (?, ?)', [nome, email]);
        res.status(201).json({ message: 'Cliente adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota PUT para atualizar um cliente pelo ID
router.put('/:id', async function (req, res, next) {
    const { nome, email } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('UPDATE clientes SET nome = ?, email = ? WHERE id = ?', [nome, email, req.params.id]);
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota DELETE para excluir um cliente pelo ID
router.delete('/:id', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;