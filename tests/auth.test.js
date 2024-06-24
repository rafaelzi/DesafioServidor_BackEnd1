const request = require('supertest');
const app = require('../app');
const db = require('../configs/dbConfiguration');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  const hashedPassword = bcrypt.hashSync('password', 10);
  await (await db).query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', ['testuser', hashedPassword]);
});

afterAll(async () => {
  await (await db).query('DELETE FROM usuarios WHERE usuario = ?', ['testuser']);
  await (await db).end();
});

describe('POST /login', () => {
  it('deve retornar um token para credenciais válidas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ usuario: 'testuser', senha: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('auth', true);
    expect(res.body).toHaveProperty('token');
  });

  it('deve retornar 401 para credenciais inválidas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ usuario: 'testuser', senha: 'wrongpassword' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Credenciais inválidas');
  });
});
