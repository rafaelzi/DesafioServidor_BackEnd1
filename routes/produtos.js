const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

//Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const precoMiddleware = require('../middlewares/precoMiddleware');
const data_atualizadoMiddleware = require('../middlewares/data_atualizadoMiddleware');
const descricaoMiddleware = require('../middlewares/descricaoMiddleware');

/* GET produtos: busca todos os produtos */
router.get('/', produtosController.findAll);

/* GET produtos/:id: busca um produtos pelo ID */
router.get('/:id', produtosController.findOne);

/* POST produtos: adiciona um novo produtos */
router.post('/', nomeMiddleware.validateName,
    precoMiddleware.validatePrice,
    data_atualizadoMiddleware.validateDateTime,
    descricaoMiddleware.validateDescription,
    produtosController.save
);

/* PUT produtos: atualiza um produtos */
router.put('/:id', produtosController.update);

/* DELETE produtos: remove um produtos pelo ID */
router.delete('/:id', produtosController.remove);

module.exports = router;