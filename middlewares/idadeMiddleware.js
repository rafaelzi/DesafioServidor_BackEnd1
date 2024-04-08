const validateAge = (request, response, next) => {
  const { body } = request

  // Verifique se o campo idade está presente no corpo da solicitação
  if (body.idade === undefined || body.idade === '') {
    return response.status(400)
      .json({ message: 'O campo "idade" é obrigatório' })
  }
  // Verifica se a idade é valida como positiva e até 130 anos
  if (isNaN(parseInt(body.idade)) || parseInt(body.idade) < 0 || parseInt(body.idade) > 130) {
    return response.status(400)
      .json({ message: 'O campo "idade" deve ser inteiro positivo e valor possível' })
  }
  // Se todas as validações passarem, passe para o próximo middleware
  next()
}   
module.exports = { validateAge }
