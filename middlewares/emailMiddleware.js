const validateEmail = (request, response, next) => {
    const { body } = request;

    // Verifique se o campo de email está presente no corpo da solicitação
    if (!body.email) {
        return response.status(400)
            .json({ message: 'O campo "email" é obrigatório' });
    }

    // Verifique se o formato do email é válido usando uma expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
        return response.status(400)
            .json({ message: 'O campo "email" deve ser um endereço de e-mail válido' });
    }

    // Se todas as validações passarem, passe para o próximo middleware
    next();
};

module.exports = { validateEmail };