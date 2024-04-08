const validateFamilyName = (request, response, next) => {
  const { body } = request

  // Verifique se o campo sobrenome está presente no corpo da solicitação
  if (body.sobrenome === undefined) {
    return response.status(400)
      .json({ message: 'O campo "sobrenome" é obrigatório' })
  }
  // Verifica se o campo sobrenome não está vazio
  if (body.sobrenome === '') {
    return response.status(400)
      .json({ message: 'O campo "sobrenome" não pode ser vazio' })
  }
  // Se todas as validações passarem, passe para o próximo middleware
  next()
}

module.exports = { validateFamilyName }
