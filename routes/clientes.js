const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

// Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware')
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware')
const idadeMiddleware = require('../middlewares/idadeMiddleware')
const emailMiddleware = require('../middlewares/emailMiddleware')

/* GET clientes: busca todos os clientes */
router.get('/', clienteController.findAll)

/* GET clientes/:id: busca um cliente pelo ID */
router.get('/:id', clienteController.findOne)

/* POST clientes: adiciona um novo cliente */
router.post('/', nomeMiddleware.validateName,
  sobrenomeMiddleware.validateFamilyName,
  idadeMiddleware.validateAge,
  emailMiddleware.validateEmail,
  clienteController.save
) 

/* PUT clientes: atualiza um cliente */
router.put('/:id', clienteController.update)

/* DELETE clientes: remove um cliente pelo ID */
router.delete('/:id', clienteController.remove)

module.exports = router
