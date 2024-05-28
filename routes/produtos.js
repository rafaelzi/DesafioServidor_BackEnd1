const express = require('express')
const router = express.Router()
const produtosController = require('../controllers/produtosController')

// Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware')
const precoMiddleware = require('../middlewares/precoMiddleware')
const dataAtualizadoMiddleware = require('../middlewares/data_atualizadoMiddleware')
const descricaoMiddleware = require('../middlewares/descricaoMiddleware')
const cacheMiddleware = require('../middlewares/cacheMiddleware')

/* GET produtos: busca todos os produtos */
router.get('/', cacheMiddleware, produtosController.findAll)

/* GET produtos/:id: busca um produto pelo ID */
router.get('/:id', cacheMiddleware, produtosController.findOne)

/* POST produtos: adiciona um novo produto */
router.post('/', nomeMiddleware.validateName,
  precoMiddleware.validatePrice,
  dataAtualizadoMiddleware.validateDateTime,
  descricaoMiddleware.validateDescription,
  produtosController.save,
  cacheMiddleware
)

/* PUT produtos: atualiza um produto */
router.put('/:id', cacheMiddleware, produtosController.update)

/* DELETE produtos: remove um produto pelo ID */
router.delete('/:id', cacheMiddleware, produtosController.remove)

module.exports = router
