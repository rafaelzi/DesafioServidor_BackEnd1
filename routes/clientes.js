const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

// Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware')
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware')
const idadeMiddleware = require('../middlewares/idadeMiddleware')
const emailMiddleware = require('../middlewares/emailMiddleware')
const cacheMiddleware = require('../middlewares/cacheMiddleware')

/* GET clientes: busca todos os clientes */
router.get('/', cacheMiddleware, clienteController.findAll)

/* GET clientes/:id: busca um cliente pelo ID */
router.get('/:id', cacheMiddleware, clienteController.findOne)

/* POST clientes: adiciona um novo cliente */
router.post('/', nomeMiddleware.validateName,
  sobrenomeMiddleware.validateFamilyName,
  idadeMiddleware.validateAge,
  emailMiddleware.validateEmail,
  clienteController.save,
  cacheMiddleware
) 

/* PUT clientes: atualiza um cliente */
router.put('/:id', cacheMiddleware, clienteController.update)

/* DELETE clientes: remove um cliente pelo ID */
router.delete('/:id', cacheMiddleware, clienteController.remove)

module.exports = router
