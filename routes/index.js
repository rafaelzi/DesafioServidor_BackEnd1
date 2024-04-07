const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Rota GET para o caminho padrão "/"
router.get('/', function (req, res, next) {
    res.send('Welcome to the home page');
});

// Rota GET para "/clientes"
router.get('/clientes', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        const [rows] = await connection.query('SELECT * FROM clientes');
        res.send(rows);
    } catch (error) {
        console.error('Error fetching clientes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota POST para "/clientes"
router.post('/clientes', async function (req, res, next) {
    try {
        const { nome, sobrenome, email, idade } = req.body;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });
        
        await connection.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
        res.status(201).send('Cliente adicionado com sucesso');
    } catch (error) {
        console.error('Error adding cliente:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota PUT para "/clientes/:id"
router.put('/clientes/:id', async function (req, res, next) {
    try {
        const { nome, sobrenome, email, idade } = req.body;
        const { id } = req.params;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        await connection.query('UPDATE clientes SET nome=?, sobrenome=?, email=?, idade=? WHERE id=?', [nome, sobrenome, email, idade, id]);
        res.send('Cliente atualizado com sucesso');
    } catch (error) {
        console.error('Error updating cliente:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota DELETE para "/clientes/:id"
router.delete('/clientes/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        await connection.query('DELETE FROM clientes WHERE id=?', [id]);
        res.send('Cliente excluído com sucesso');
    } catch (error) {
        console.error('Error deleting cliente:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota GET para "/produtos"
router.get('/produtos', async function (req, res, next) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        const [rows] = await connection.query('SELECT * FROM produtos');
        res.send(rows);
    } catch (error) {
        console.error('Error fetching produtos:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota POST para "/produtos"
router.post('/produtos', async function (req, res, next) {
    try {
        const { nome, descricao, preco, data_atualizado } = req.body;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });
        
        await connection.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
        res.status(201).send('Produto adicionado com sucesso');
    } catch (error) {
        console.error('Error adding produto:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota PUT para "/produtos/:id"
router.put('/produtos/:id', async function (req, res, next) {
    try {
        const { nome, descricao, preco, data_atualizado } = req.body;
        const { id } = req.params;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        await connection.query('UPDATE produtos SET nome=?, descricao=?, preco=?, data_atualizado=? WHERE id=?', [nome, descricao, preco, data_atualizado, id]);
        res.send('Produto atualizado com sucesso');
    } catch (error) {
        console.error('Error updating produto:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Rota DELETE para "/produtos/:id"
router.delete('/produtos/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'backend-I-express-mysql-RafaelCabral',
            port: 3306
        });

        await connection.query('DELETE FROM produtos WHERE id=?', [id]);
        res.send('Produto excluído com sucesso');
    } catch (error) {
        console.error('Error deleting produto:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;