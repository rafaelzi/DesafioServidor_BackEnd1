const request = require('supertest');
const app = require('../app');
const db = require('../configs/dbConfiguration'); // Corrigido para apontar para o caminho correto
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

let token;

beforeAll(async () => {
  const hashedPassword = bcrypt.hashSync('password', 10);
  await (await db).query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', ['testuser', hashedPassword]);

  const [rows] = await (await db).query('SELECT * FROM usuarios WHERE usuario = ?', ['testuser']);
  const user = rows[0];
  token = jwt.sign({ id: user.id, usuario: user.usuario }, secret, { expiresIn: '1h' });
});

afterAll(async () => {
  await (await db).query('DELETE FROM usuarios WHERE usuario = ?', ['testuser']);
  await (await db).end();
});

describe('GET /clientes', () => {
  it('deve retornar 401 sem token', async () => {
    const res = await request(app).get('/clientes');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Token não fornecido');
  });

  it('deve retornar 200 com token válido', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
