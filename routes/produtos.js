const express = require('express')
const router = express.Router()
const produtosController = require('../controllers/produtosController')

// Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware')
const precoMiddleware = require('../middlewares/precoMiddleware')
const dataAtualizadoMiddleware = require('../middlewares/data_atualizadoMiddleware')
const descricaoMiddleware = require('../middlewares/descricaoMiddleware')

/* GET produtos: busca todos os produtos */
router.get('/', produtosController.findAll)

/* GET produtos/:id: busca um produto pelo ID */
router.get('/:id', produtosController.findOne)

/* POST produtos: adiciona um novo produto */
router.post('/', nomeMiddleware.validateName,
  precoMiddleware.validatePrice,
  dataAtualizadoMiddleware.validateDateTime,
  descricaoMiddleware.validateDescription,
  produtosController.save
)

/* PUT produtos: atualiza um produto */
router.put('/:id', produtosController.update)

/* DELETE produtos: remove um produto pelo ID */
router.delete('/:id', produtosController.remove)

module.exports = router
