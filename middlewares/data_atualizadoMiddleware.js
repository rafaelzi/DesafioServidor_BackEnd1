const moment = require('moment')

const validateDateTime = (request, response, next) => {
  const { body } = request

  // Verifique se o campo de data atualizado está presente no corpo da solicitação
  if (!body.data_atualizado) {
    return response.status(400)
      .json({ message: 'O campo "data_atualizado" é obrigatório' })
  }

  // Verifique se o valor do campo é um objeto Date válido
  if (!moment(body.data_atualizado, moment.ISO_8601, true).isValid()) {
    return response.status(400)
      .json({ message: 'O campo "data_atualizado" deve ser uma data válida no formato ISO 8601' })
  }

  // Se todas as validações passarem, passe para o próximo middleware
  next()
}

module.exports = { validateDateTime }
