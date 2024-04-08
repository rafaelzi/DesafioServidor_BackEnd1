const validateName = (request, response, next) => {
  const { body } = request

  // Verifique se o campo nome está presente no corpo da solicitação
  if (body.nome === undefined) {
    return response.status(400)
      .json({ message: 'O campo "nome" é obrigatório' })
  }
  // Verifica se o campo nome não está vazio
  if (body.nome === '') {
    return response.status(400)
      .json({ message: 'O campo "nome" não pode ser vazio' })
  }
  // Se todas as validações passarem, passe para o próximo middleware
  next()
}

module.exports = { validateName }
