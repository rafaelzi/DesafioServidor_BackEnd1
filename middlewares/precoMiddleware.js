const validatePrice = (request, response, next) => {
  const { body } = request

  // Verifique se o campo de preço está presente no corpo da solicitação
  if (body.preco === undefined || body.preco === null) {
    return response.status(400)
      .json({ message: 'O campo "preco" é obrigatório' })
  }

  // Verifique se o preço é um número e se é positivo
  if (isNaN(body.preco) || body.preco < 0) {
    return response.status(400)
      .json({ message: 'O campo "preco" deve ser um número decimal positivo' })
  }

  // Se todas as validações passarem, passe para o próximo middleware
  next()
}

module.exports = { validatePrice }
