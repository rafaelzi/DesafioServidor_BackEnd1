const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/* GET clientes: busca todos os clientes */
router.get('/', clienteController.findAll);

/* GET clientes/:id: busca um cliente pelo ID */
router.get('/:id', clienteController.findOne);

/* POST clientes: adiciona um novo cliente */
router.post('/', clienteController.save);

/* PUT clientes: atualiza um cliente */
router.put('/:id', clienteController.update);

/* DELETE clientes: remove um cliente pelo ID */
router.delete('/:id', clienteController.remove);

module.exports = router;