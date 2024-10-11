// tests/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(response.status).toBe(200);
  });

  it('should fail login with invalid credentials', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'wrongpassword',
    });
    expect(response.status).toBe(401);
  });
});