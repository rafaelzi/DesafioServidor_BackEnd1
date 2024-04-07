const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

/* GET produtos: busca todos os produtos */
router.get('/', produtosController.findAll);

/* GET produtos/:id: busca um produtos pelo ID */
router.get('/:id', produtosController.findOne);

/* POST produtos: adiciona um novo produtos */
router.post('/', produtosController.save);

/* PUT produtos: atualiza um produtos */
router.put('/:id', produtosController.update);

/* DELETE produtos: remove um produtos pelo ID */
router.delete('/:id', produtosController.remove);

module.exports = router;